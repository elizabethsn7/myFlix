if (!user && register === false)
  return (
    <LoginView
      onClick={() => this.register()}
      onLoggedIn={user => this.onLoggedIn(user)}
    />
  );
if (register)
  return (
    <RegistrationView
      onClick={() => this.alreadyMember()}
      onSignedIn={user => this.onSignedIn(user)}
    />
  );

if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
