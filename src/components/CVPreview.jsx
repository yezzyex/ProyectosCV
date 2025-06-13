import React from 'react';

const icons = {
  email: <svg width="16" height="16" fill="#1976d2" viewBox="0 0 24 24"><path d="M12 13.065 2 6.5V18h20V6.5l-10 6.565zM12 11 2 4h20L12 11z"/></svg>,
  phone: <svg width="16" height="16" fill="#1976d2" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>,
  location: <svg width="16" height="16" fill="#1976d2" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>,
  link: <svg width="14" height="14" fill="#1976d2" viewBox="0 0 24 24"><path d="M3.9 12a5 5 0 0 1 5-5h4a1 1 0 1 1 0 2h-4a3 3 0 1 0 0 6h4a1 1 0 1 1 0 2h-4a5 5 0 0 1-5-5zm7-1a1 1 0 0 1 1-1h4a5 5 0 1 1 0 10h-4a1 1 0 1 1 0-2h4a3 3 0 1 0 0-6h-4a1 1 0 0 1-1-1z"/></svg>
};

// Helper para nivel de idioma (0-100)
const getLevelPercent = (level) => {
  if (!level) return 0;
  const map = { 'Básico': 30, 'Intermedio': 60, 'Avanzado': 85, 'Nativo': 100 };
  if (typeof level === 'string' && map[level]) return map[level];
  if (typeof level === 'number') return Math.max(0, Math.min(100, level));
  return 0;
};

export default function CVPreview({ cvData }) {
  return (
    <div className="cv-preview cv-preview-modern">
      <div className="cv-professional-header">
        <div className="cv-professional-header-content">
          {cvData.personal?.photo && (
            <img
              src={cvData.personal.photo}
              alt="Foto de perfil"
              className="cv-professional-profile-pic"
            />
          )}
          <div className="cv-professional-header-info">
            <h1>{cvData.personal?.name || 'Tu Nombre'}</h1>
            <div className="cv-professional-profession">{cvData.personal?.profession || 'Profesión'}</div>
            <div className="cv-professional-contact">
              <span>{icons.email} {cvData.personal?.email || 'tu@email.com'}</span> {' '}
              <span>{icons.phone} {cvData.personal?.phone || '000 000 000'}</span> {' '}
              <span>{icons.location} {cvData.personal?.address || 'Dirección'}</span>
            </div>
            {cvData.personal?.links && cvData.personal.links.length > 0 && (
              <div className="cv-professional-links">
                {cvData.personal.links.map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="cv-professional-link-badge">{icons.link} {link}</a>
                ))}
              </div>
            )}
          </div>
        </div>
        {cvData.personal?.summary && (
          <div className="cv-professional-summary">{cvData.personal.summary}</div>
        )}
      </div>
      <hr className="cv-divider" />
      <div className="cv-professional-main-content">
        <div className="cv-professional-main-left">
          <div className="cv-professional-section">
            <h2>Habilidades</h2>
            <ul className="cv-professional-skills-list">
              {cvData.skills?.length ? cvData.skills.map((skill, i) => (
                <li key={i} className="cv-professional-skill-pill">{skill} <span className="cv-professional-badge">Skill</span></li>
              )) : <li className="cv-professional-empty">Sin habilidades añadidas</li>}
            </ul>
          </div>
          <div className="cv-professional-section">
            <h2>Programas</h2>
            <ul className="cv-professional-skills-list">
              {cvData.programs?.length ? cvData.programs.map((prog, i) => (
                <li key={i} className="cv-professional-skill-pill">{prog} <span className="cv-professional-badge">Software</span></li>
              )) : <li className="cv-professional-empty">Sin programas añadidos</li>}
            </ul>
          </div>
          {cvData.languages?.length > 0 && (
            <div className="cv-professional-section">
              <h2>Idiomas</h2>
              <ul className="cv-professional-skills-list" style={{flexDirection:'column',gap:'0.7rem'}}>
                {cvData.languages?.length ? cvData.languages.map((lang, i) => (
                  <li key={i} style={{width:'100%'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <span style={{fontWeight:600}}>{lang.name}</span>
                      <span className="cv-professional-badge">{lang.level}</span>
                    </div>
                    <div className="cv-professional-language-bar">
                      <div className="cv-professional-language-bar-inner" style={{width:`${getLevelPercent(lang.level)}%`}}></div>
                    </div>
                  </li>
                )) : <li className="cv-professional-empty">Sin idiomas añadidos</li>}
              </ul>
            </div>
          )}
        </div>
        <div className="cv-professional-main-right">
          <div className="cv-professional-section">
            <h2>Experiencia</h2>
            <ul className="cv-professional-timeline">
              {cvData.experience?.length ? cvData.experience.map((exp, i) => {
                let duracion = '';
                if (exp.years && exp.months) {
                  duracion = `${exp.years} año${exp.years === '1' ? '' : 's'} ${exp.months} mes${exp.months === '1' ? '' : 'es'}`;
                } else if (exp.years) {
                  duracion = `${exp.years} año${exp.years === '1' ? '' : 's'}`;
                } else if (exp.months) {
                  duracion = `${exp.months} mes${exp.months === '1' ? '' : 'es'}`;
                }
                return (
                  <li key={i} style={{position:'relative',marginBottom:'1.2rem'}}>
                    <span className="cv-professional-timeline-dot"></span>
                    <div className="cv-professional-job-title">{exp.position}</div>
                    <div className="cv-professional-job-company">{exp.company} {duracion && <span className="cv-professional-job-years">({duracion})</span>}</div>
                    {exp.description && <div className="cv-professional-job-desc">{exp.description}</div>}
                    {exp.profile && <div className="cv-professional-job-profile">Perfil: {exp.profile}</div>}
                    <hr className="cv-divider cv-divider-thin" />
                  </li>
                );
              }) : <li className="cv-professional-empty">Sin experiencia añadida</li>}
            </ul>
          </div>
          <div className="cv-professional-section">
            <h2>Educación</h2>
            <ul className="cv-professional-timeline">
              {cvData.education?.length ? cvData.education.map((edu, i) => {
                let duracion = '';
                if (edu.years && edu.months) {
                  duracion = `${edu.years} año${edu.years === '1' ? '' : 's'} ${edu.months} mes${edu.months === '1' ? '' : 'es'}`;
                } else if (edu.years) {
                  duracion = `${edu.years} año${edu.years === '1' ? '' : 's'}`;
                } else if (edu.months) {
                  duracion = `${edu.months} mes${edu.months === '1' ? '' : 'es'}`;
                }
                return (
                  <li key={i} style={{position:'relative',marginBottom:'1.2rem'}}>
                    <span className="cv-professional-timeline-dot"></span>
                    <div className="cv-professional-edu-title">{edu.degree}</div>
                    <div className="cv-professional-edu-inst">{edu.institution} {duracion && <span className="cv-professional-edu-years">({duracion})</span>}</div>
                    {edu.description && <div className="cv-professional-edu-desc">{edu.description}</div>}
                    <hr className="cv-divider cv-divider-thin" />
                  </li>
                );
              }) : <li className="cv-professional-empty">Sin educación añadida</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
