# Personal-budget-II
Use of the Envelope Budgeting method to manage a personal budget.

The Envelope Budgeting system consists in separating expenses into categories and setting a limit to each category.

This API allows the user to manage an envelope that contains three categories of expenses: "Phone", "Food" and "Gas".

The user can GET all envelopes from '**/envelopes**', or a specific envelope at 'envelope/:envelopeName'.
All envelopes display their current expense and their limit.

To withdraw an amount from an envelope, a POST request can be made to '**/withdraw/:envelopeName**'. The body of the request must contain the 'amount' property with the value of the amount to be withdrawn.

The user can transfer money from one envelope to the other by making a PUT request to ‘*/transfer/:from/:to**' ('from': name of the envelope to withdraw from; 'to': name of the envelope that should receive the funds). The 'amount' property of the body should specify the transfer amount.

To delete an envelope, a DELETE request should be made to '**/envelope/delete/:envelopeName**'.

![envelopes](https://github.com/e-dovi/Personal-budget-II/assets/118570519/a905a9bf-e260-44e5-ae29-1a538a5d14c2)
