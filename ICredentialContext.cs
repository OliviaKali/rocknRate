namespace rocknrate_spotify.Auth
{
    public interface ICredentialContext
    {
        string id { get; set; }
        string secret { get; set; }
    }
}