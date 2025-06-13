import React, { useState } from 'react';

export default function CVForm({ cvData, setCvData }) {
  const [personal, setPersonal] = useState(cvData.personal || {});
  const [experience, setExperience] = useState(cvData.experience || []);
  const [education, setEducation] = useState(cvData.education || []);
  const [skills, setSkills] = useState(cvData.skills || []);
  const [languages, setLanguages] = useState(cvData.languages || []);
  const [links, setLinks] = useState(cvData.personal?.links || []);
  const [photoPreview, setPhotoPreview] = useState(cvData.personal?.photo || null);
  const [programs, setPrograms] = useState(cvData.programs || []);

  const handlePersonalChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setPersonal((prev) => {
          const updated = { ...prev, photo: reader.result };
          setCvData((cv) => ({ ...cv, personal: { ...updated, links } }));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (i, field, value) => {
    const updated = [...experience];
    updated[i][field] = value;
    setExperience(updated);
  };

  const handleEducationChange = (i, field, value) => {
    const updated = [...education];
    updated[i][field] = value;
    setEducation(updated);
  };

  const handleSkillChange = (i, value) => {
    const updated = [...skills];
    updated[i] = value;
    setSkills(updated);
  };
  const removeSkill = (i) => setSkills(skills.filter((_, idx) => idx !== i));
  const removeExperience = (i) => setExperience(experience.filter((_, idx) => idx !== i));
  const removeEducation = (i) => setEducation(education.filter((_, idx) => idx !== i));
  const removeLink = (i) => setLinks(links.filter((_, idx) => idx !== i));

  const handleLanguageChange = (i, field, value) => {
    const updated = [...languages];
    updated[i] = { ...updated[i], [field]: value };
    setLanguages(updated);
  };
  const addLanguage = () => setLanguages([...languages, { name: '', level: '' }]);
  const removeLanguage = (i) => setLanguages(languages.filter((_, idx) => idx !== i));

  const handleLinkChange = (i, value) => {
    const updated = [...links];
    updated[i] = value;
    setLinks(updated);
  };

  const handleProgramChange = (i, value) => {
    const updated = [...programs];
    updated[i] = value;
    setPrograms(updated);
  };
  const removeProgram = (i) => setPrograms(programs.filter((_, idx) => idx !== i));

  const addExperience = () => setExperience([...experience, { position: '', company: '', years: '', description: '' }]);
  const addEducation = () => setEducation([...education, { degree: '', institution: '', years: '', description: '' }]);
  const addSkill = () => setSkills([...skills, '']);
  const addLink = () => setLinks([...links, '']);
  const addProgram = () => setPrograms([...programs, '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCvData({ personal: { ...personal, links }, experience, education, skills, languages, programs });
  };

  return (
    <form className="cv-form" onSubmit={handleSubmit}>
      <h2>Datos personales</h2>
      <div className="cv-form-photo-block">
        <label htmlFor="photo">Foto de perfil:</label>
        <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
        {photoPreview && (
          <img src={photoPreview} alt="Previsualización" className="cv-form-photo-preview" />
        )}
      </div>
      <label htmlFor="name">Nombre</label>
      <input id="name" name="name" placeholder="Nombre" value={personal.name || ''} onChange={handlePersonalChange} />
      <label htmlFor="profession">Profesión</label>
      <input id="profession" name="profession" placeholder="Profesión" value={personal.profession || ''} onChange={handlePersonalChange} />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" placeholder="Email" value={personal.email || ''} onChange={handlePersonalChange} />
      <label htmlFor="phone">Teléfono</label>
      <input id="phone" name="phone" placeholder="Teléfono" value={personal.phone || ''} onChange={handlePersonalChange} />
      <label htmlFor="address">Dirección</label>
      <input id="address" name="address" placeholder="Dirección" value={personal.address || ''} onChange={handlePersonalChange} />
      <label htmlFor="summary">Resumen profesional</label>
      <textarea id="summary" name="summary" placeholder="Resumen profesional" value={personal.summary || ''} onChange={handlePersonalChange} />

      <h2>Enlaces</h2>
      {links.map((link, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor={`link${i}`}>Enlace {i + 1}</label>
          <input id={`link${i}`} placeholder="URL (LinkedIn, web, etc)" value={link} onChange={e => handleLinkChange(i, e.target.value)} />
          <button type="button" onClick={() => removeLink(i)} style={{background:'#e57373',color:'#fff',border:'none',borderRadius:4,padding:'0.2rem 0.7rem',fontWeight:600}}>X</button>
        </div>
      ))}
      <button type="button" onClick={addLink}>Añadir enlace</button>

      <h2>Experiencia</h2>
      {experience.map((exp, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1rem', position: 'relative' }}>
          <button type="button" onClick={() => removeExperience(i)} style={{position:'absolute',right:0,top:0,background:'#e57373',color:'#fff',border:'none',borderRadius:4,padding:'0.2rem 0.7rem',fontWeight:600,zIndex:2}}>X</button>
          <label htmlFor={`exp-position${i}`}>Puesto</label>
          <input id={`exp-position${i}`} placeholder="Puesto" value={exp.position} onChange={e => handleExperienceChange(i, 'position', e.target.value)} />
          <label htmlFor={`exp-company${i}`}>Empresa</label>
          <input id={`exp-company${i}`} placeholder="Empresa" value={exp.company} onChange={e => handleExperienceChange(i, 'company', e.target.value)} />
          <label htmlFor={`exp-years${i}`}>Duración</label>
          <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
            <input id={`exp-years${i}`} placeholder="Años (ej: 2)" style={{width:'70px'}} value={exp.years || ''} onChange={e => handleExperienceChange(i, 'years', e.target.value)} />
            <span style={{fontWeight:500}}>años</span>
            <input placeholder="Meses (ej: 3)" style={{width:'70px'}} value={exp.months || ''} onChange={e => handleExperienceChange(i, 'months', e.target.value)} />
            <span style={{fontWeight:500}}>meses</span>
          </div>
          <label htmlFor={`exp-desc${i}`}>Descripción</label>
          <textarea id={`exp-desc${i}`} placeholder="Descripción" value={exp.description || ''} onChange={e => handleExperienceChange(i, 'description', e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addExperience}>Añadir experiencia</button>

      <h2>Educación</h2>
      {education.map((edu, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1rem', position: 'relative' }}>
          <button type="button" onClick={() => removeEducation(i)} style={{position:'absolute',right:0,top:0,background:'#e57373',color:'#fff',border:'none',borderRadius:4,padding:'0.2rem 0.7rem',fontWeight:600,zIndex:2}}>X</button>
          <label htmlFor={`edu-degree${i}`}>Título</label>
          <input id={`edu-degree${i}`} placeholder="Título" value={edu.degree} onChange={e => handleEducationChange(i, 'degree', e.target.value)} />
          <label htmlFor={`edu-inst${i}`}>Institución</label>
          <input id={`edu-inst${i}`} placeholder="Institución" value={edu.institution} onChange={e => handleEducationChange(i, 'institution', e.target.value)} />
          <label htmlFor={`edu-years${i}`}>Duración</label>
          <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
            <input id={`edu-years${i}`} placeholder="Años (ej: 2)" style={{width:'70px'}} value={edu.years || ''} onChange={e => handleEducationChange(i, 'years', e.target.value)} />
            <span style={{fontWeight:500}}>años</span>
            <input placeholder="Meses (ej: 3)" style={{width:'70px'}} value={edu.months || ''} onChange={e => handleEducationChange(i, 'months', e.target.value)} />
            <span style={{fontWeight:500}}>meses</span>
          </div>
          <label htmlFor={`edu-desc${i}`}>Descripción</label>
          <textarea id={`edu-desc${i}`} placeholder="Descripción" value={edu.description || ''} onChange={e => handleEducationChange(i, 'description', e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addEducation}>Añadir educación</button>

      <h2>Habilidades</h2>
      {skills.map((skill, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor={`skill${i}`}>Habilidad {i + 1}</label>
          <input id={`skill${i}`} placeholder="Habilidad" value={skill} onChange={e => handleSkillChange(i, e.target.value)} />
          <button type="button" onClick={() => removeSkill(i)} style={{background:'#e57373',color:'#fff',border:'none',borderRadius:4,padding:'0.2rem 0.7rem',fontWeight:600}}>X</button>
        </div>
      ))}
      <button type="button" onClick={addSkill}>Añadir habilidad</button>

      <h2>Idiomas</h2>
      {languages.map((lang, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <label htmlFor={`lang${i}`}>Idioma {i + 1}</label>
          <input id={`lang${i}`} placeholder="Idioma" value={lang.name || ''} onChange={e => handleLanguageChange(i, 'name', e.target.value)} style={{minWidth:'120px'}} />
          <input placeholder="Nivel (ej: B2, Nativo, etc)" value={lang.level || ''} onChange={e => handleLanguageChange(i, 'level', e.target.value)} style={{minWidth:'120px'}} />
          <button type="button" onClick={() => removeLanguage(i)} style={{background:'#e57373',color:'#fff',border:'none',borderRadius:4,padding:'0.2rem 0.7rem',fontWeight:600}}>X</button>
        </div>
      ))}
      <button type="button" onClick={addLanguage}>Añadir idioma</button>

      <h2>Programas</h2>
      {programs.map((prog, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor={`prog${i}`}>Programa {i + 1}</label>
          <input id={`prog${i}`} placeholder="Programa (ej: Photoshop, Excel, etc)" value={prog} onChange={e => handleProgramChange(i, e.target.value)} />
          <button type="button" onClick={() => removeProgram(i)} style={{background:'#e57373',color:'#fff',border:'none',borderRadius:4,padding:'0.2rem 0.7rem',fontWeight:600}}>X</button>
        </div>
      ))}
      <button type="button" onClick={addProgram}>Añadir programa</button>

      <button type="submit">Actualizar CV</button>
    </form>
  );
}
