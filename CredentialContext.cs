using System;

namespace rocknrate_spotify.Auth
{
    public class CredentialContext : ICredentialContext
    {
        public string id { get; set; } =
            Environment.GetEnvironmentVariable("rocknrate_spotify.id", EnvironmentVariableTarget.User);

        public string secret { get; set; } =
            Environment.GetEnvironmentVariable("rocknrate_spotify.secret", EnvironmentVariableTarget.User);
    }
}