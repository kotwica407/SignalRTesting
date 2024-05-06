using Microsoft.AspNetCore.SignalR;

namespace SignalTest.Hubs
{
    public class TestHub : Hub<ITestClient>, ITestHub
    {
        public async Task BroadcastMessage(string message)
        {
            await Clients.Others.MessageOccured(message);
        }
    }
}
