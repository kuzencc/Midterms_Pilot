function ProjectList({ projects }) {
  return (
    <section className="project-list">
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-header">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>

            <div className="task-list">
              <h3>Tasks</h3>

              {project.tasks.length === 0 ? (
                <p>No tasks in this project.</p>
              ) : (
                <ul>
                  {project.tasks.map((task) => (
                    <li key={task.id} className="task-item">
                      <div>
                        <span className="task-title">{task.title}</span>
                        <span className={`task-status ${task.status}`}>
                          {task.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))
      )}
    </section>
  );
}

export default ProjectList;