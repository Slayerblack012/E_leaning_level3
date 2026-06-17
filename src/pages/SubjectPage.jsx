import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function SubjectPage(){
  const { id } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get(`/api/quizzes/${id}`).then(res => {
      if (!mounted) return;
      setQuizzes(res.data.quizzes || []);
      setLoading(false);
    }).catch(()=>setLoading(false));
    return ()=>{ mounted = false };
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  return (
    <div>
      <h2>Môn: {id}</h2>
      <h3>Bài luyện nhanh</h3>
      {quizzes.length === 0 && <div>Chưa có bài tập sẵn sàng.</div>}
      {quizzes.map((q, idx) => (
        <div key={idx} style={{ background:'#fff', padding:12, border:'1px solid #eee', borderRadius:8, marginBottom:8 }}>
          <div style={{ fontWeight:700 }}>{idx+1}. {q.q}</div>
          <ul>
            {q.options && q.options.map((o,i)=> (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
