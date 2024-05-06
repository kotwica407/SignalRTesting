namespace SignalTest.Hubs
{
    public interface ITestClient
    {
        Task InvoicePaid(Guid invoiceId);
        Task InvoiceIssued(Guid invoiceId);
        Task ContractGenerated(Guid contractId);
        Task MessageOccured(string message);
    }
}
