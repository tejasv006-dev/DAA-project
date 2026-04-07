import React from 'react';

export default function AlignmentControl({ params, setParams }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: isNaN(value) ? value : Number(value) }));
  };

  return (
    <div className="glass-panel" style={{ padding: '1.5rem' }}>
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
        Sequence Parameters
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="label">Patient DNA Sequence</label>
          <input 
            type="text" 
            name="patientSeq" 
            value={params.patientSeq} 
            onChange={handleChange} 
            className="input-field"
            placeholder="e.g. ATGCGTACA"
          />
        </div>
        
        <div>
          <label className="label">Reference Genomce (NCBI)</label>
          <input 
            type="text" 
            name="refSeq" 
            value={params.refSeq} 
            onChange={handleChange} 
            className="input-field"
            placeholder="e.g. ATGCATACA"
          />
        </div>

        <div style={{ borderTop: '1px solid var(--card-border)', margin: '0.5rem 0' }}></div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="label">Match Score</label>
            <span className="slider-val">+{params.matchScore}</span>
          </div>
          <div className="slider-container">
            <input type="range" name="matchScore" value={params.matchScore} onChange={handleChange} min="1" max="5" className="slider" />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="label">Mismatch Penalty</label>
            <span className="slider-val" style={{ color: '#ef4444' }}>{params.mismatchScore}</span>
          </div>
          <div className="slider-container">
            <input type="range" name="mismatchScore" value={params.mismatchScore} onChange={handleChange} min="-5" max="-1" className="slider" />
          </div>
        </div>

        <div>
           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label className="label">Gap Penalty</label>
            <span className="slider-val" style={{ color: '#ef4444' }}>{params.gapPenalty}</span>
          </div>
          <div className="slider-container">
            <input type="range" name="gapPenalty" value={params.gapPenalty} onChange={handleChange} min="-5" max="-1" className="slider" />
          </div>
        </div>
      </div>
    </div>
  );
}
