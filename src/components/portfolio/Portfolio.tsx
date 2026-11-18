import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/constants";
import { t, type Locale } from "@/i18n";
import { useTheme } from "@/hooks/useTheme";

function ProjectItem({
  project,
  locale,
}: {
  project: (typeof projects)[number];
  locale: Locale;
}) {
  const [image, setImage] = useState(0);
  const theme = useTheme();
  const tr = (key: string) => t(locale, key);
  const detail = (key: string) => tr(`portfolio.projects.${project.id}.${key}`);
  const images = (theme === "light" ? project.imagesLight : project.images) || [
    project.image,
  ];
  const showingRelatedSite = Boolean(
    project.relatedSite && image === images.length - 1,
  );
  const previewSite = showingRelatedSite
    ? project.relatedSite!
    : { name: project.title, url: project.url };
  const technologies =
    project.id === "maplelinecards"
      ? ["Rust", "Axum", "PostgreSQL", "React", "TypeScript"]
      : ["Python", "FastAPI", "PostgreSQL", "React", "Docker"];
  return (
    <article className="project">
      <div className={`project-preview ${project.id}`}>
        <div className="preview-bar">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{new URL(previewSite.url).hostname}</span>
          <ArrowUpRight size={13} aria-hidden="true" />
        </div>
        <img
          src={images[image]}
          alt={`${previewSite.name}: ${detail(`screenshot${image + 1}`)}`}
          width="1280"
          height="800"
          loading="lazy"
        />
        <div className="preview-controls">
          <span>
            {image + 1} / {images.length}
          </span>
          <div>
            <button
              onClick={() =>
                setImage((image + images.length - 1) % images.length)
              }
              aria-label={tr("portfolio.previousScreenshot")}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setImage((image + 1) % images.length)}
              aria-label={tr("portfolio.nextScreenshot")}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="project-description">{detail("description")}</p>
        {project.relatedSite && (
          <p className="project-description">
            {detail("relatedSiteDescription")}{" "}
            <button
              className="preview-link"
              onClick={() => setImage(images.length - 1)}
            >
              {locale === "fr" ? "Voir l’aperçu" : "Preview the new search"}
            </button>
          </p>
        )}
        <ul className="technology-list" aria-label={tr("portfolio.archLabel")}>
          {technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-facts">
          {(project.id === "maplelinecards" ? [1, 4] : [4, 3]).map((n) => (
            <div key={n}>
              <strong>{detail(`metricValue${n}`)}</strong>
              <span>{detail(`metricLabel${n}`)}</span>
            </div>
          ))}
        </div>
        <div className="project-actions">
          <a
            className="text-link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.relatedSite
              ? new URL(project.url).hostname
              : locale === "fr"
                ? "Voir le site en ligne"
                : "Visit live website"}
            <ArrowUpRight size={16} />
          </a>
          {project.relatedSite && (
            <a
              className="text-link"
              href={project.relatedSite.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {new URL(project.relatedSite.url).hostname}
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
      <details className="project-details">
        <summary>
          {tr("portfolio.architectureButton")}
          <span aria-hidden="true">+</span>
        </summary>
        <div className="details-grid">
          <div>
            <h4>{detail("dbLabel")}</h4>
            <p>{detail("dbDesc")}</p>
          </div>
          <div>
            <h4>{tr("portfolio.challenges")}</h4>
            <ul>
              {[1, 2, 3].map((n) => (
                <li key={n}>{detail(`challenge${n}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </article>
  );
}
export function Portfolio({ locale }: { locale: Locale }) {
  return (
    <section id="portfolio" className="section work-section container">
      <h2 className="section-heading">{t(locale, "portfolio.heading")}</h2>
      <div className="projects">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </section>
  );
}
