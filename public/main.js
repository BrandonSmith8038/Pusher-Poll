const form = document.getElementById('vote-form');

// Form Submit Event
form.addEventListener('submit', e => {
  const choice = document.querySelector('input[name=os]:checked').value;
  const data = { os: choice };
  fetch('http://localhost:3001/poll', {
    method: 'post',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(e => console.log(e));

  e.preventDefault();
});

fetch('http://localhost:3001/poll')
  .then(res => res.json())
  .then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;

    //Count Vote Points --accumulator/current
    const voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
      )
    );
    let dataPoints = [
      { label: 'Windows', y: voteCounts.Windows },
      { label: 'macos', y: voteCounts.macos },
      { label: 'Linux', y: voteCounts.Linux },
      { label: 'Other', y: voteCounts.Other }
    ];

    //Bar Char
    const graphChartContainer = document.querySelector('#graphChartContainer');

    if (graphChartContainer) {
      const chart = new CanvasJS.Chart('graphChartContainer', {
        animationEnabled: true,
        theme: 'theme2',
        title: {
          text: `Total Votes: ${totalVotes}`
        },
        data: [
          {
            type: 'column',
            dataPoints: dataPoints
          }
        ]
      });
      chart.render();
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      const pusher = new Pusher('651ed63eaacd6e21f56c', {
        cluster: 'us2',
        encrypted: true
      });

      const channel = pusher.subscribe('os-poll');
      channel.bind('os-vote', function(data) {
        dataPoints = dataPoints.map(x => {
          if (x.label == data.os) {
            x.y += data.points;
            return x;
          } else {
            return x;
          }
        });
        chart.render();
      });
    }
  });
