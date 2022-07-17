//COURSE
const Course = (props) =>{
    const { courses } = props
      return (
          <div>
            {courses.map(course => {
              return (
              <div key={course.id}>
                  <h1>{course.name}</h1>
                  {course.parts.map(part => <p key={part.id}>{part.name}: {part.exercises}</p>)}
                  <p>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</p>
              </div>
               )
               }
             )}
        </div>
  )
  } 

export default Course