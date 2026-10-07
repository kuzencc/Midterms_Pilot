import { useState } from "react";

function ProjectForm({ onSubmit }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!projectName.trim()) {
      return;
    }

    onSubmit({
      name: projectName.trim(),
      description: description.trim(),
    });

    setProjectName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="form-group">
        <label htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          type="text"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          placeholder="Enter project name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter project description"
          rows="4"
        />
      </div>

      <button type="submit">Create Project</button>
    </form>
  );
}

export default ProjectForm;