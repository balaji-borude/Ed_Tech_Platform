import RenderSteps from "./RenderSteps"

export default function AddCourse(){
    return(
        <>
            <div className="text-white flex flex-row gap-6 ">
                 
                <div>
                    <h1> Add course </h1>

                    <div>
                        <RenderSteps/> 
                    </div>

                </div>

                {/* right side div */}
                <div>
                    <p>code Upload Tips </p>

                    <ul>
                        <li>set the course Price Option or make it Free  </li>
                        <li> Standdard size of course thumbnail is 1024x576</li>
                        <li> Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li> Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>

                    </ul>
                </div>

             </div>
        </>

    )
}