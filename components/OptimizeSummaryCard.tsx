// ATSSummary.tsx
import React from 'react';

interface ATSProps {
  responseData: {
    content: string;
    total_tokens: number;
    cost_incurred: string;
  } | null;
}

export default function ATSSummary(responseData: any) {
  if (!responseData) return null;

  const parsedContent = JSON.parse(responseData.content);
  const maxScores = {
    layout: 6,
    keywords: 6,
    spelling_and_grammar: 3,
    experience_quality: 5,
  };

  const renderIssuesAndActions = (
    title: string,
    score: string | number,
    maxScore: number,
    issues: string[],
    recommendedActions: string[]
  ) => (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>
        <strong>Score:</strong> {score} / {maxScore}
        <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(Number(score) / maxScore) * 100}%` }}
          ></div>
        </div>
      </p>
      {issues.length > 0 && (
        <div>
          <p className="font-semibold mt-2">Issues:</p>
          <ul className="list-disc pl-5">
            {issues.map((issue, index) => (
              <li key={index} className="text-red-600">{issue}</li> 
            ))}
          </ul>
        </div>
      )}
      {recommendedActions.length > 0 && (
        <div>
          <p className="font-semibold mt-2">Recommended Actions:</p>
          <ul className="list-disc pl-5">
            {recommendedActions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-10 text-left bg-gray-100 p-6 rounded-lg shadow-lg max-w-full sm:max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-4">ATS Summary</h2>

      {parsedContent.optimize_resume_output.ats_summary.metrics?.layout &&
        renderIssuesAndActions(
          "Layout",
          parsedContent.optimize_resume_output.ats_summary.metrics.layout.score,
          maxScores.layout,
          parsedContent.optimize_resume_output.ats_summary.metrics.layout.issues,
          parsedContent.optimize_resume_output.ats_summary.metrics.layout.recommended_actions
        )}

      {parsedContent.optimize_resume_output.ats_summary.metrics?.keywords &&
        renderIssuesAndActions(
          "Keywords",
          parsedContent.optimize_resume_output.ats_summary.metrics.keywords.score,
          maxScores.keywords,
          parsedContent.optimize_resume_output.ats_summary.metrics.keywords.issues,
          parsedContent.optimize_resume_output.ats_summary.metrics.keywords.recommended_actions
        )}

      {parsedContent.optimize_resume_output.ats_summary.metrics?.spelling_and_grammar &&
        renderIssuesAndActions(
          "Spelling & Grammar",
          parsedContent.optimize_resume_output.ats_summary.metrics.spelling_and_grammar.score,
          maxScores.spelling_and_grammar,
          [parsedContent.optimize_resume_output.ats_summary.metrics.spelling_and_grammar.issues],
          parsedContent.optimize_resume_output.ats_summary.metrics.spelling_and_grammar.recommended_actions
        )}

      {parsedContent.optimize_resume_output.ats_summary.metrics?.experience_quality &&
        renderIssuesAndActions(
          "Experience Quality",
          parsedContent.optimize_resume_output.ats_summary.metrics.experience_quality.score,
          maxScores.experience_quality,
          parsedContent.optimize_resume_output.ats_summary.metrics.experience_quality.issues,
          parsedContent.optimize_resume_output.ats_summary.metrics.experience_quality.recommended_actions
        )}

      {parsedContent.optimize_resume_output.ats_summary.final_score && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Final Score: {parsedContent.optimize_resume_output.ats_summary.final_score}</h3>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Tokens: {responseData.total_tokens}</h3>
        <h3 className="text-lg font-semibold">Cost Incurred: {responseData.cost_incurred}</h3>
      </div>
    </div>
  );
};