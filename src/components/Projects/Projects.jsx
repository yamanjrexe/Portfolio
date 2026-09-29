import React, { useEffect, useState, useMemo } from "react";
import SpotlightCard from "../core/SpotlightCard";
import "./Projects.css";

const Projects = ({ id }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const savedFilter = localStorage.getItem("projectFilter");
    if (savedFilter) setFilter(savedFilter);

    fetch("/data/projects.json")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    localStorage.setItem("projectFilter", newFilter);
    setCurrentPage(1);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "live":
        return { label: "Live", class: "status-live" };
      case "development":
        return { label: "In progress", class: "status-development" };
      case "completed":
        return { label: "Completed", class: "status-completed" };
      case "coming-soon":
        return { label: "Coming soon", class: "status-coming-soon" };
      default:
        return { label: "Live", class: "status-live" };
    }
  };

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const statusFilters = [
    { key: "all", label: "All", icon: "fas fa-th-large" },
    { key: "live", label: "Live", icon: "fas fa-play-circle" },
    { key: "development", label: "In progress", icon: "fas fa-code-branch" },
    { key: "completed", label: "Completed", icon: "fas fa-check-circle" },
  ];

  const ProjectSkeleton = () => (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-body">
        <div className="skeleton-line sm" />
        <div className="skeleton-line md" />
        <div className="skeleton-line lg" />
        <div className="skeleton-line lg" />
      </div>
    </div>
  );

  return (
    <section id={id} className="projects reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Projects</span>
          <h2 className="section-title">Things I&rsquo;ve built and shipped</h2>
          <div className="section-line" />
        </div>

        <div className="projects-filter">
          {statusFilters.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? "active" : ""}`}
              onClick={() => handleFilterChange(f.key)}
            >
              <i className={f.icon} aria-hidden="true" />
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects-list">
          {loading ? (
            Array(6)
              .fill()
              .map((_, i) => <ProjectSkeleton key={i} />)
          ) : currentProjects.length > 0 ? (
            currentProjects.map((project, index) => {
              const statusConfig = getStatusConfig(project.status);
              const isLiveUrlValid =
                project.liveUrl &&
                project.liveUrl !== "not-found or not online yet" &&
                project.liveUrl !== "#";
              const displayIndex = String(startIndex + index + 1).padStart(
                2,
                "0",
              );

              return (
                <SpotlightCard key={project.id} className="project-card">
                  <div className="project-image-wrap">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/800x500/1a1a1d/e63946?text=Project";
                      }}
                    />
                  </div>

                  <div className="project-content">
                    <div className="project-header">
                      <span className="project-category">
                        {project.featured ? "Featured" : "Project"}
                      </span>
                      <span className="project-index">{displayIndex}</span>
                    </div>

                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>

                    <div className="project-tech">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="tech-tag">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="project-footer">
                      <div className={`project-status ${statusConfig.class}`}>
                        <span className="status-dot" />
                        {statusConfig.label}
                      </div>

                      <div className="project-links">
                        {isLiveUrlValid && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                          >
                            Preview
                            <i
                              className="fas fa-arrow-up-right-from-square"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <i className="fab fa-github" aria-hidden="true" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="fas fa-folder-open" aria-hidden="true" />
              </div>
              <h3>No projects in this category</h3>
            </div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
              Previous
            </button>
            <div className="pagination-numbers">
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`dots-${index}`} className="pagination-dots">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`pagination-number ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
        )}

        {!loading && filteredProjects.length > 0 && (
          <div className="results-info">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredProjects.length)} of{" "}
            {filteredProjects.length} projects
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
