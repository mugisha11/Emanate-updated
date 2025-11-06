async function postJson(url, body) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const txt = await resp.text();
  let json;
  try { json = JSON.parse(txt); } catch (e) { json = txt; }
  return { status: resp.status, body: json };
}

(async () => {
  try {
    console.log('Testing /api/contact...');
    const c = await postJson('http://localhost:3001/api/contact', {
      name: 'Automated Test',
      email: 'tester@example.com',
      subject: 'Test contact',
      message: 'This is a test from send_tests.mjs'
    });
    console.log('/api/contact ->', c);

    console.log('Testing /api/join...');
    const j = await postJson('http://localhost:3001/api/join', {
      type: 'volunteer',
      name: 'Automated Applicant',
      email: 'applicant@example.com',
      phone: '000-000-0000',
      message: 'I want to help',
      consent: true,
    });
    console.log('/api/join ->', j);
  } catch (err) {
    console.error('Test script error', err);
    process.exit(1);
  }
})();
