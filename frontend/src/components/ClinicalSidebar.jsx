import React from 'react';
import { ShieldAlert, Fingerprint } from 'lucide-react';

export default function ClinicalSidebar({ patientSeq, refSeq }) {
  // Simple mock to detect differences
  const isMatch = patientSeq.length === refSeq.length && patientSeq === refSeq;
  
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', flex: 1 }}>
      <h3 style={{ marginBottom: '1.5rem', color: 'var(--path-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldAlert size={20} />
        Clinical Insights
      </h3>
      
      {isMatch ? (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--heatmap-high)' }}>
          <p style={{ margin: 0, color: 'white' }}>No mutations detected. Patient sequence matches the reference genome perfectly.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--path-color)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--path-color)' }}>
               <Fingerprint size={16} />
               Potential SNP / Indel Detected
            </h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              The alignment shows deviations from the NCBI reference genome. 
              Substitutions (SNPs) can lead to missense mutations (like in Sickle Cell Anemia). 
              Gaps introduced by penalties may indicate frameshift Insertions/Deletions.
            </p>
          </div>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '8px' }}>
             <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
               <strong>Note:</strong> The current heatmap represents the Dynamic Programming matrix. The highlighted path traces the optimal local alignment score. Disconnected paths represent gap penalties incurred during evolution.
             </p>
          </div>
        </div>
      )}
    </div>
  );
}
