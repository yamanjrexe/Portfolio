import React, { useEffect, useState, useMemo } from "react";
import "../Skeleton/Skeleton.css";
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
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
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
        return {
          label: "LIVE DEMO",
          class: "status-live",
          icon: "fas fa-play-circle",
        };
      case "development":
        return {
          label: "IN DEVELOPMENT",
          class: "status-development",
          icon: "fas fa-code-branch",
        };
      case "completed":
        return {
          label: "COMPLETED",
          class: "status-completed",
          icon: "fas fa-check-circle",
        };
      case "coming-soon":
        return {
          label: "COMING SOON",
          class: "status-coming-soon",
          icon: "far fa-clock",
        };
      default:
        return {
          label: "LIVE DEMO",
          class: "status-live",
          icon: "fas fa-play-circle",
        };
    }
  };

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.status === filter);
  }, [projects, filter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById(id).offsetTop - 100,
      behavior: "smooth",
    });
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
    { key: "all", label: "All Projects", icon: "fas fa-th-large" },
    { key: "live", label: "Live Demo", icon: "fas fa-play-circle" },
    { key: "development", label: "In Development", icon: "fas fa-code-branch" },
    { key: "completed", label: "Completed", icon: "fas fa-check-circle" },
  ];

  const ProjectSkeleton = () => (
    <div className="skeleton-card-list">
      <div className="skeleton-image-list"></div>
      <div className="skeleton-content-list">
        <div className="skeleton-header-list">
          <div className="skeleton-title-short"></div>
          <div className="skeleton-index"></div>
        </div>
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
        <div className="skeleton-tags">
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
          <div className="skeleton-tag"></div>
        </div>
        <div className="skeleton-footer-list">
          <div className="skeleton-stat"></div>
          <div className="skeleton-links"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id={id} className="projects reveal">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <i className="fas fa-laptop-code"></i> My Creative Work
          </span>
          <h2 className="section-title">
            Featured <span className="gradient">Projects</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="projects-filter">
          {statusFilters.map((filterType) => (
            <button
              key={filterType.key}
              className={`filter-btn ${filter === filterType.key ? "active" : ""}`}
              onClick={() => handleFilterChange(filterType.key)}
            >
              <i className={filterType.icon}></i>
              {filterType.label}
            </button>
          ))}
        </div>

        <div className="projects-list stagger-children">
          {loading ? (
            Array(6)
              .fill()
              .map((_, index) => <ProjectSkeleton key={`skeleton-${index}`} />)
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

              const imageEl = (
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/800x600/1e293b/8b5cf6?text=Project+Image";
                  }}
                />
              );

              return (
                <div key={project.id} className="project-card-list">
                  <div className="project-image-list">
                    {isLiveUrlValid ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-image-link"
                        aria-label={`Open ${project.title}`}
                      >
                        {imageEl}
                      </a>
                    ) : (
                      imageEl
                    )}
                    <div className="image-overlay"></div>
                  </div>

                  <div className="project-content-list">
                    <div className="project-header-list">
                      <span className="project-category">
                        {project.featured ? "FEATURED" : "PROJECT"}
                      </span>
                      <span className="project-index">{displayIndex}</span>
                    </div>

                    <h3 className="project-title-list">{project.title}</h3>
                    <p className="project-description-list">
                      {project.description}
                    </p>

                    <div className="project-tech-list">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="tech-tag-list">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="tech-tag-list">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="project-footer-list">
                      <div
                        className={`project-status-text ${statusConfig.class}`}
                      >
                        <span className="status-dot"></span>
                        {statusConfig.label}
                      </div>

                      <div className="project-links-list">
                        {isLiveUrlValid && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-list"
                          >
                            View Project{" "}
                            <i className="fas fa-arrow-up-right-from-square"></i>
                          </a>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-list"
                        >
                          <i className="fab fa-github"></i> Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <i className="fas fa-folder-open"></i>
              </div>
              <h3>No projects found</h3>
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
              <i className="fas fa-chevron-left"></i> Previous
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
                    className={`pagination-number ${
                      currentPage === page ? "active" : ""
                    }`}
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
              Next <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}

        {!loading && filteredProjects.length > 0 && (
          <div className="results-info">
            Showing {startIndex + 1} -{" "}
            {Math.min(endIndex, filteredProjects.length)} of{" "}
            {filteredProjects.length} projects
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
