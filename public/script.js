// Dashboard Counters
function updateDashboard(users, missions, progress) {
  document.getElementById("total-users").textContent = users.length;
  document.getElementById("total-missions").textContent = missions.length;
  const completed = progress.filter(p => p.status === "completed").length;
  document.getElementById("total-completed").textContent = completed;
}

// Users
let allUsers = [], allMissions = [], allProgress = [];
fetch("/api/users")
  .then(res => res.json())
  .then(users => {
    allUsers = users;
    const container = document.getElementById("users-cards");
    users.forEach(u => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${u.name}</h3><p>${u.email}</p>`;
      container.appendChild(card);
    });
    loadMissions();
  });

// Missions
function loadMissions() {
  fetch("/api/missions")
    .then(res => res.json())
    .then(missions => {
      allMissions = missions;
      const container = document.getElementById("missions-cards");
      missions.forEach(m => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<h3>${m.title}</h3><p>${m.description}</p><p>Points: ${m.points}</p>`;
        container.appendChild(card);
      });
      loadProgress();
    });
}

// Progress & Leaderboard
function loadProgress() {
  fetch("/api/progress")
    .then(res => res.json())
    .then(progress => {
      allProgress = progress;
      const container = document.getElementById("progress-cards");
      container.innerHTML = "";
      const leaderboard = {};

      progress.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        const fillPercent = p.status === "completed" ? p.score : 0;

        card.innerHTML = `
          <p>User ${p.user_id} - Mission ${p.mission_id}</p>
          <p>Status: ${p.status}</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${fillPercent}%"></div>
          </div>
        `;

        if (p.status === "pending") {
          const btn = document.createElement("button");
          btn.textContent = "✅ Complete Mission";
          btn.onclick = () => completeMission(p.id);
          card.appendChild(btn);
        }

        container.appendChild(card);

        leaderboard[p.user_id] = (leaderboard[p.user_id] || 0) + (p.score || 0);
      });

      // Dashboard
      updateDashboard(allUsers, allMissions, allProgress);

      // Leaderboard
      const lb = document.getElementById("leaderboard-list");
      lb.innerHTML = "";
      const sortedUsers = Object.keys(leaderboard).sort((a,b) => leaderboard[b]-leaderboard[a]);
      sortedUsers.forEach(uid => {
        const li = document.createElement("li");
        li.textContent = `User ${uid} - ${leaderboard[uid]} points`;
        lb.appendChild(li);
      });

      // Animate progress bars
      document.querySelectorAll(".progress-fill").forEach(bar => {
  const { width } = bar.style;
        bar.style.width = "0%";
        setTimeout(() => { bar.style.width = width; }, 100);
      });

      // Draw charts
      drawCharts(leaderboard);
    });
}

// Complete mission
function completeMission(progressId) {
  fetch(`/api/progress/${progressId}/complete`, { method: "POST" })
    .then(res => res.json())
    .then(msg => {
      alert(msg.message);
      location.reload();
    });
}

// Charts
function drawCharts(leaderboard) {
  // Missions per user (bar)
  const ctxMissions = document.getElementById('missionsChart').getContext('2d');
  const missionsCount = {};
  allProgress.forEach(p => {
    missionsCount[p.user_id] = (missionsCount[p.user_id] || 0) + 1;
  });
  new Chart(ctxMissions, {
    type: 'bar',
    data: {
      labels: Object.keys(missionsCount),
      datasets: [{
        label: 'Missions Completed',
        data: Object.values(missionsCount),
        backgroundColor: '#4caf50'
      }]
    }
  });

  // Completed vs Pending (pie)
  const ctxStatus = document.getElementById('statusChart').getContext('2d');
  const completed = allProgress.filter(p => p.status === 'completed').length;
  const pending = allProgress.length - completed;
  new Chart(ctxStatus, {
    type: 'pie',
    data: {
      labels: ['Completed', 'Pending'],
      datasets: [{
        label: 'Mission Status',
        data: [completed, pending],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    }
  });

  // Leaderboard points chart
  const ctxLeaderboard = document.getElementById('leaderboardChart').getContext('2d');
  new Chart(ctxLeaderboard, {
    type: 'bar',
    data: {
      labels: Object.keys(leaderboard),
      datasets: [{
        label: 'Leaderboard Points',
        data: Object.values(leaderboard),
        backgroundColor: '#1565c0'
      }]
    }
  });
}
