import Course from '../Models/Course.js';

// Create a new course
export const createCourse = async (req, res) => {
 

  const { title, description, imageURL, duration, createdBy, totalSeats } = req.body;

  // Validation
  if (!title || !description || !imageURL || !duration || !createdBy?.email || !createdBy?.uid || !totalSeats) {
    return res.status(400).json({ error: 'Missing required fields including totalSeats' });
  }

  if (totalSeats <= 0) {
    return res.status(400).json({ error: 'Total seats must be greater than 0' });
  }

  try {
    const newCourse = new Course({
      title,
      description,
      imageURL,
      duration,
      totalSeats,
      enrolledUsers: [],
      createdBy: {
        email: createdBy.email,
        name: createdBy.name || 'Anonymous',
        uid: createdBy.uid,
      },
    });

    const saved = await newCourse.save();
    res.status(201).json({ success: true, course: saved });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create course', details: err.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
  }
};

// Get latest 6 courses
export const getLatestCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({ success: true, courses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest courses', details: err.message });
  }
};


export const toggleEnrollment = async (req, res) => {
  const { courseId } = req.params;
  const user = req.user; 

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

 
    const isUserEnrolled = course.enrolledUsers.find(u => u.uid === user.uid);

    if (isUserEnrolled) {
      course.enrolledUsers = course.enrolledUsers.filter(u => u.uid !== user.uid);
      await course.save();
      return res.status(200).json({ message: 'User unenrolled successfully', course });
    } else {
      if (course.enrolledUsers.length >= course.totalSeats) {
        return res.status(400).json({ error: 'No seats left in this course' });
      }

      const userEnrolledCoursesCount = await Course.countDocuments({
        'enrolledUsers.uid': user.uid,
      });
      console.log('User enrolled courses count:', userEnrolledCoursesCount);

      if (userEnrolledCoursesCount >= 3) {
        return res.status(400).json({ error: 'User cannot enroll in more than 3 courses' });
      }

      // Enroll the user
      course.enrolledUsers.push({
        email: user.email,
        uid: user.uid,
      });

      await course.save();
      return res.status(200).json({ message: 'User enrolled successfully', course });
    }

  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ error: 'Server error during enrollment', details: error.message });
  }
};


export const getPopularCourses = async (req, res, next) => {
  try {
    const popularCourses = await Course.find()
      .sort({ 'enrolledUsers.length': -1 }) 
      .limit(6);
    const sorted = popularCourses.sort((a, b) => b.enrolledUsers.length - a.enrolledUsers.length);

    res.status(200).json({ success: true, courses: sorted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch popular courses', details: err.message });
  }
};

export const getIndividualCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error('Error fetching course:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve course',
      details: error.message,
    });
  }
};
export const myEnrollments = async (req, res) => {
  const user = req.user;

  if (!user || !user.uid) {
    return res.status(401).json({ success: false, error: 'Unauthorized or missing user data' });
  }

  try {
    const courses = await Course.find({
      'enrolledUsers.uid': user.uid,
    });

    if (courses.length === 0) {
      return res.status(200).json({ success: true, courses: [] }); // return empty array instead of 404
    }

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('Error fetching user courses:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user courses',
      details: error.message,
    });
  }
};

export const getCoursesByUser = async (req, res) => {
  const user = req.user;

  try {
    const courses = await Course.find({
      'createdBy.uid': user.uid,
    });

    if (courses.length === 0) {
      return res.status(200).json({ success: true, courses: [] }); 
    }

    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('Error fetching user courses:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user courses',
      details: error.message,
    });
  }
}

export const removeEnrollment = async (req, res) => {
  const { courseId } = req.params;
  const user = req.user;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const isUserEnrolled = course.enrolledUsers.find(u => u.uid === user.uid);
    if (!isUserEnrolled) {
      return res.status(400).json({ error: 'User is not enrolled in this course' });
    }
    course.enrolledUsers = course.enrolledUsers.filter(u => u.uid !== user.uid);
    await course.save();
    res.status(200).json({ message: 'User unenrolled successfully', course });
  } catch (error) {
    console.error('Error removing enrollment:', error);
    res.status(500).json({ error: 'Server error during unenrollment', details: error.message });
  } 
}


export const removeCourse = async (req, res) => {
  const { courseId } = req.params;
  const user = req.user;

  try {
    const course = await Course.findById(courseId); 
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (course.createdBy.uid !== user.uid) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({ message: 'Course deleted successfully' });
  }
  catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Server error during course deletion', details: error.message });
  } 
}

export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const user = req.user;
  const { title, description, imageURL, duration, totalSeats } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    if (course.createdBy.uid !== user.uid) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    course.title = title || course.title;
    course.description = description || course.description;
    course.imageURL = imageURL || course.imageURL;
    course.duration = duration || course.duration;
    course.totalSeats = totalSeats || course.totalSeats;
    const updatedCourse = await course.save();
    res.status(200).json({ success: true, course: updatedCourse }); 
  }
  catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Server error during course update', details: error.message });
  }
}
