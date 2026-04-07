import { useState, useEffect } from 'react';
import AlignmentControl from './components/AlignmentControl';
import Heatmap from './components/Heatmap';
import ClinicalSidebar from './components/ClinicalSidebar';
import SequencePreview from './components/SequencePreview';
import { Activity } from 'lucide-react';
import './App.css';


function App() {
  const [params, setParams] = useState({
    patientSeq: 'ATGCGTACA',
    refSeq: 'ATGCATACA',
    matchScore: 2,
    mismatchScore: -1,
    gapPenalty: -2
  });

  const [alignmentData, setAlignmentData] = useState(null);

  useEffect(() => {
    const fetchAlignment = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/align', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patientSeq: params.patientSeq,
            refSeq: params.refSeq,
            matchScore: params.matchScore,
            mismatchScore: params.mismatchScore,
            gapPenalty: params.gapPenalty
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          setAlignmentData(data);
        } else {
          console.error("Failed to fetch alignment data");
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
    };

    fetchAlignment();
  }, [params]);

  return (
    <div className="app-container" style={{ padding: '2rem', maxWidth: '1440px', margin: '0 auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--accent-glow)', padding: '0.75rem', borderRadius: '12px' }}>
          <Activity color="var(--accent-primary)" size={32} />
        </div>
        <div>
          <h1 className="title-glow" style={{ fontSize: '2.5rem', fontWeight: '700', margin: 0 }}>Smith-Waterman Alignment</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Rare Disease Diagnostic Engine</p>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <AlignmentControl params={params} setParams={setParams} />
          <ClinicalSidebar patientSeq={params.patientSeq} refSeq={params.refSeq} alignmentData={alignmentData} />
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Dynamic Programming Matrix</span>
            {alignmentData && <span style={{ fontSize: '0.9rem', color: 'var(--accent-primary)' }}>Optimal Score: {alignmentData.score}</span>}
          </h2>
          
          <SequencePreview alignmentData={alignmentData} />

          {alignmentData ? (
             <Heatmap data={alignmentData} />
          ) : (
            <div style={{ margin: 'auto', color: 'var(--text-muted)' }}>Calculating Alignment...</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
