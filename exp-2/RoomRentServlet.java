import java.io.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.WebServlet;

@WebServlet("/roomrent")
public class RoomRentServlet extends HttpServlet {

    // Room types with per-day rates
    private static final double STANDARD_RATE = 1500.0;
    private static final double DELUXE_RATE   = 2500.0;
    private static final double SUITE_RATE    = 5000.0;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Show the input form
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("""
            <html><body>
            <h2>Room Rent Calculator</h2>
            <form method="post" action="roomrent">
                <label>Guest Name: <input type="text" name="guestName" required/></label><br/><br/>
                <label>Room Type:
                    <select name="roomType">
                        <option value="standard">Standard (₹1500/day)</option>
                        <option value="deluxe">Deluxe (₹2500/day)</option>
                        <option value="suite">Suite (₹5000/day)</option>
                    </select>
                </label><br/><br/>
                <label>Number of Days: <input type="number" name="days" min="1" required/></label><br/><br/>
                <input type="submit" value="Calculate Rent"/>
            </form>
            </body></html>
        """);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String guestName = request.getParameter("guestName");
        String roomType  = request.getParameter("roomType");
        String daysParam = request.getParameter("days");

        // Basic validation
        if (guestName == null || roomType == null || daysParam == null
                || guestName.isBlank() || daysParam.isBlank()) {
            out.println("<html><body><p>Invalid input. <a href='roomrent'>Go back</a></p></body></html>");
            return;
        }

        int days;
        try {
            days = Integer.parseInt(daysParam.trim());
            if (days <= 0) throw new NumberFormatException();
        } catch (NumberFormatException e) {
            out.println("<html><body><p>Days must be a positive number. <a href='roomrent'>Go back</a></p></body></html>");
            return;
        }

        double ratePerDay = switch (roomType.toLowerCase()) {
            case "deluxe" -> DELUXE_RATE;
            case "suite"  -> SUITE_RATE;
            default       -> STANDARD_RATE;
        };

        double totalRent = ratePerDay * days;
        double tax       = totalRent * 0.18;   // 18% GST
        double grandTotal = totalRent + tax;

        out.println("""
            <html><body>
            <h2>Room Rent Bill</h2>
            <table border="1" cellpadding="8">
                <tr><td>Guest Name</td><td>%s</td></tr>
                <tr><td>Room Type</td><td>%s</td></tr>
                <tr><td>Rate per Day</td><td>₹%.2f</td></tr>
                <tr><td>Number of Days</td><td>%d</td></tr>
                <tr><td>Rent (before tax)</td><td>₹%.2f</td></tr>
                <tr><td>GST (18%%)</td><td>₹%.2f</td></tr>
                <tr><td><strong>Grand Total</strong></td><td><strong>₹%.2f</strong></td></tr>
            </table>
            <br/><a href="roomrent">Calculate Again</a>
            </body></html>
        """.formatted(guestName, roomType, ratePerDay, days, totalRent, tax, grandTotal));
    }
}
