document.addEventListener('DOMContentLoaded', initDay46);

function initDay46() {
  const logBox = document.getElementById('lifecycleLog');

  function writeLog(msg) {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.textContent = `[${time}] ${msg}`;
    if (logBox.textContent.trim() === 'No lifecycle events yet.') logBox.textContent = '';
    logBox.prepend(entry);
  }

  // ------- Mount / Unmount demo (simulated component) -------
  const mountBtn = document.getElementById('mountBtn');
  const unmountBtn = document.getElementById('unmountBtn');
  const compArea = document.getElementById('compArea');

  let mounted = false;
  let compInterval = null;

  mountBtn.addEventListener('click', () => {
    if (mounted) { writeLog('Component already mounted.'); return; }
    mounted = true;
    writeLog('Component mounted — like componentDidMount / useEffect([]).');
    compArea.textContent = 'Component is mounted. (It will say hello every 2s)';
    // simulate an effect with cleanup: start interval
    compInterval = setInterval(() => { writeLog('Effect: hello from mounted component'); }, 2000);
  });

  unmountBtn.addEventListener('click', () => {
    if (!mounted) { writeLog('Component already unmounted.'); return; }
    // cleanup
    if (compInterval) {
      clearInterval(compInterval);
      compInterval = null;
      writeLog('Cleanup ran — interval cleared on unmount.');
    }
    mounted = false;
    compArea.textContent = 'Component is not mounted.';
    writeLog('Component unmounted — like cleanup returned by useEffect.');
  });

  // ------- Timer effect example (start/stop) -------
  const startTimer = document.getElementById('startTimer');
  const stopTimer = document.getElementById('stopTimer');
  const secondsEl = document.getElementById('seconds');
  let sec = 0;
  let timerId = null;

  startTimer.addEventListener('click', () => {
    if (timerId) { writeLog('Timer already running.'); return; }
    // start effect
    writeLog('Timer effect started (like useEffect that sets interval).');
    timerId = setInterval(() => {
      sec += 1; secondsEl.textContent = String(sec);
    }, 1000);
  });

  stopTimer.addEventListener('click', () => {
    if (!timerId) { writeLog('Timer not running.'); return; }
    clearInterval(timerId); timerId = null;
    writeLog('Timer stopped and cleaned up (cleanup).');
  });

  // ------- Dependency example (simulate running effect when dependency changes) -------
  const depInput = document.getElementById('depInput');
  const updateDep = document.getElementById('updateDep');
  const depLog = document.getElementById('depLog');
  let lastDep = depInput.value;

  updateDep.addEventListener('click', () => {
    const val = depInput.value;
    // simulate effect with dependency array [val]
    if (val !== lastDep) {
      depLog.textContent = `Effect ran because dependency changed to "${val}"`;
      writeLog(`Dependency effect: ran because value changed to "${val}"`);
      lastDep = val;
    } else {
      depLog.textContent = `No change — effect does not run when dependency is the same ("${val}")`;
      writeLog('Dependency effect: did not run (no change).');
    }
  });

  // ------- Fetch example (data effect with cancellation) -------
  const fetchMount = document.getElementById('fetchMount');
  const fetchUnmount = document.getElementById('fetchUnmount');
  const fetchStatus = document.getElementById('fetchStatus');
  let controller = null;

  fetchMount.addEventListener('click', () => {
    if (controller) { writeLog('Fetcher already mounted.'); return; }
    writeLog('Fetcher mounted — starting network request (effect).');
    fetchStatus.textContent = 'Loading...';
    controller = new AbortController();
    // fetch a sample resource
    fetch('https://jsonplaceholder.typicode.com/todos/1', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        fetchStatus.textContent = `Loaded: ${data.title}`;
        writeLog('Fetcher effect: data received.');
        // auto-unmount after receiving for demo cleanup
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          fetchStatus.textContent = 'Fetch aborted (cleaned up).';
          writeLog('Fetcher effect: request aborted during cleanup.');
        } else {
          fetchStatus.textContent = 'Fetch error.';
          writeLog('Fetcher effect: network error.');
        }
      });
  });

  fetchUnmount.addEventListener('click', () => {
    if (!controller) { writeLog('Fetcher not mounted.'); return; }
    controller.abort(); // cleanup
    controller = null;
    writeLog('Fetcher unmounted — abort called (cleanup).');
  });

  // ------- Small guide logs for kid -------
  writeLog('Open this page to learn useEffect: mount (run), update (run when deps change), cleanup (stop timers/fetches).');
}