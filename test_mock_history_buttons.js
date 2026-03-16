function populateTestHistory() {
  localStorage.removeItem('cognitiveTestHistory'); // Clean slate for this specific test
  const now = new Date();
  
  // Create 3 fake runs
  const runs = [];
  for(let i=0; i<3; i++) {
    const d = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
    runs.push({
      date: `run: ${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`,
      name: i === 1 ? "My Renamed Baseline Score" : `run: ${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`,
      durationLabel: i === 0 ? "Short (1 Round)" : "Long (3 Rounds)",
      totalTime: "1m 30s",
      testsCompleted: 9,
      scoreSummary: "Overall Metric: 85 / 100",
      rawScores: { audioReaction: [{avgReaction: 200}] },
      rawBreakdowns: {}
    });
  }
  
  localStorage.setItem('cognitiveTestHistory', JSON.stringify(runs));
  console.log("Injected 3 mock runs for button testing");
}
populateTestHistory();
