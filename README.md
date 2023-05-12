# Personal-budget-II
Use of the Envelope Budgeting method to manage a personal budget.

The Envelope Budgeting system consists in separating expenses into categories and setting a limit to each category.

This API provides an application of the Envelope Budgeting system.

The user can GET all envelopes from '**/envelopes**', or a specific envelope at 'envelope/:envelopeName'.
All envelopes display their current expense and their limit.

To add an envelope, a POST request should be made to ‘**envelope/add**’. The body of the request should contain the properties ‘name’ and ‘max’. (‘**name**’: name of the envelope to be added; ‘**max**’: maximum expense that could be made with the added envelope.

To withdraw an amount from an envelope, a POST request can be made to '**/withdraw/:envelopeName**'. The body of the request must contain the '**amount**' property which specifies the value of the amount to be withdrawn.

The user can transfer money from one envelope to the other by making a PUT request to ‘**/transfer/:from/:to**' ('**from**': name of the envelope to withdraw from; '**to**': name of the envelope that should receive the funds). The 'amount' property of the body should specify the transfer amount.

To delete an envelope, a DELETE request should be made to '**/envelope/delete/:envelopeName**'.

![envelopes](https://github.com/e-dovi/Personal-budget-II/assets/118570519/a905a9bf-e260-44e5-ae29-1a538a5d14c2)

![add](https://github.com/e-dovi/Personal-budget-II/assets/118570519/2aebb370-1304-4346-b17f-a3fa6462c288)

![withdraw](https://github.com/e-dovi/Personal-budget-II/assets/118570519/8976c5dc-2f62-4f21-80ea-3a90e5a20c99)

![transfer](https://github.com/e-dovi/Personal-budget-II/assets/118570519/a469fe26-522b-4ab1-afa0-2d9d77339c96)

![delete](https://github.com/e-dovi/Personal-budget-II/assets/118570519/7c1de2b3-d3b4-4947-b70a-3ca1aabf2983)

