namespace SignalTest.Hubs
{
    public interface ITestHub
    {
        Task BroadcastMessage(string message);
    }
}
