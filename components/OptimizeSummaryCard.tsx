// ATSSummary.tsx
import React from 'react';

export default function ATSSummary({ evaluationData }: { evaluationData: any }) {
  if (!evaluationData) return null;

  const { content, total_tokens, cost_incurred } = evaluationData;
  const atsSummary = content.ats_summary;
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
      <div>
        <strong>Score:</strong> {score} / {maxScore}
        <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(Number(score) / maxScore) * 100}%` }}
          ></div>
        </div>
      </div>
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

      {atsSummary.metrics.layout &&
        renderIssuesAndActions(
          "Layout",
          atsSummary.metrics.layout.score,
          maxScores.layout,
          atsSummary.metrics.layout.issues,
          atsSummary.metrics.layout.recommended_actions
        )}

      {atsSummary.metrics.keywords &&
        renderIssuesAndActions(
          "Keywords",
          atsSummary.metrics.keywords.score,
          maxScores.keywords,
          atsSummary.metrics.keywords.issues,
          atsSummary.metrics.keywords.recommended_actions
        )}

      {atsSummary.metrics.spelling_and_grammar &&
        renderIssuesAndActions(
          "Spelling & Grammar",
          atsSummary.metrics.spelling_and_grammar.score,
          maxScores.spelling_and_grammar,
          Array.isArray(atsSummary.metrics.spelling_and_grammar.issues)
            ? atsSummary.metrics.spelling_and_grammar.issues
            : [atsSummary.metrics.spelling_and_grammar.issues],
          atsSummary.metrics.spelling_and_grammar.recommended_actions
        )}

      {atsSummary.metrics.experience_quality &&
        renderIssuesAndActions(
          "Experience Quality",
          atsSummary.metrics.experience_quality.score,
          maxScores.experience_quality,
          atsSummary.metrics.experience_quality.issues,
          atsSummary.metrics.experience_quality.recommended_actions
        )}

      {atsSummary.final_score && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Final Score: {atsSummary.final_score}</h3>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Total Tokens: {total_tokens}</h3>
        <h3 className="text-lg font-semibold">Cost Incurred: {cost_incurred}</h3>
      </div>
    </div>
  );
};
