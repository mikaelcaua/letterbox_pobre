export async function login({ username, password }: { username: string; password: string }) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Erro ao fazer login');
    return res.json();
}

export async function register({ username, password }: { username: string; password: string }) {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error('Erro ao registrar');
    return res.json();
}

export async function logout() {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (!res.ok) throw new Error('Erro ao sair');
    return res;
} 