import Course from '../Models/Course.js';

export const createCourse = async (req, res) => {
   const queryEmail = req.query.email;
   const tokenEmail = req.user?.email;
   if( queryEmail !== tokenEmail) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  const { title, description, imageURL, duration, createdBy } = req.body;
  

  // Basic validation (you can enhance this)
  if (!title || !description || !imageURL || !duration || !createdBy?.email || !createdBy?.uid) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newCourse = new Course({
      title,
      description,
      imageURL,
      duration,
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
