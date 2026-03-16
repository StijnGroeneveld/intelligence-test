function populateTestHistory() {
  localStorage.removeItem('cognitiveTestHistory'); // Clean slate for this specific test
  const now = new Date();
  
  // Create 1 fake run
  const runs = [];
  const d = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  runs.push({
    date: `run: ${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`,
    name: "My Renamed Baseline Score",
    durationLabel: "Short (1 Round)",
    totalTime: "1m 30s",
    testsCompleted: 9,
    scoreSummary: "Overall Metric: 85 / 100",
    rawScores: { audioReaction: [{avgReaction: 200}], visualReaction: [{avgReaction: 300}] },
    rawBreakdowns: {}
  });
  
  localStorage.setItem('cognitiveTestHistory', JSON.stringify(runs));
  console.log("Injected 1 mock run for detail button testing");
}
populateTestHistory();
