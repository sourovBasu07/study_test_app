interface Session {
  [key: string]: any; // You can replace this with more specific properties as needed
}

/* abstract */ class SessionStore {
  findSession(id: string) {}
  saveSession(id: string, session: Session) {}
  findAllSessions() {}
}

class InMemorySessionStore extends SessionStore {
  private sessions = new Map<string, Session>();
  constructor() {
    super();
    this.sessions = new Map<string, Session>();
  }

  findSession(id: string): Session | undefined {
    return this.sessions.get(id);
  }

  saveSession(id: string, session: Session): void {
    this.sessions.set(id, session);
  }

  findAllSessions(): Session[] {
    return [...this.sessions.values()];
  }
}

export { InMemorySessionStore };
