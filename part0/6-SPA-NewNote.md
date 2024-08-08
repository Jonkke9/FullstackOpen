```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server->>browser: Response code 201 (created)
    Note right of browser: Event is called which causes the browser to rerender the data.
```
