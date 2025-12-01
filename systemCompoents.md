```mermaid
flowchart TB

  %% ============================
  %% Signature-be Backend Components
  %% ============================
  subgraph Backend["Signature-be Backend Components"]
    envHandlers["Envelope Lifecycle Handlers"]
    docHandlers["Document Handlers"]
    recHandlers["Recipient Handlers"]
    auditHandlers["Audit Handlers"]
    healthHandlers["Health Monitoring Handlers"]

    ddbLib["DynamoDB Access Library"]
    s3Lib["S3 Access Library"]
    validationLib["Validation Library (wraps HZZH Types)"]
    respLib["Response Formatting Library"]

    %% Handlers use shared libraries (no direct DB/S3 access)
    envHandlers --> ddbLib
    envHandlers --> s3Lib
    envHandlers --> validationLib
    envHandlers --> respLib

    docHandlers --> ddbLib
    docHandlers --> s3Lib
    docHandlers --> validationLib
    docHandlers --> respLib

    recHandlers --> ddbLib
    recHandlers --> s3Lib
    recHandlers --> validationLib
    recHandlers --> respLib

    auditHandlers --> ddbLib
    auditHandlers --> validationLib
    auditHandlers --> respLib

    healthHandlers --> respLib
  end

  %% ============================
  %% Signature Frontend Components
  %% ============================
  subgraph Frontend["Signature Frontend Components"]
    layout["Layout & Navigation Layer"]

    pageList["Page: Envelope List"]
    pageDetail["Page: Envelope Detail"]
    pageUpload["Page: Document Upload"]
    pageRecipients["Page: Recipient Management"]

    services["Service Layer / API Client"]
  end

  %% Layout to pages
  layout --> pageList
  layout --> pageDetail
  layout --> pageUpload
  layout --> pageRecipients

  %% Pages call service layer
  pageList --> services
  pageDetail --> services
  pageUpload --> services
  pageRecipients --> services

  %% ============================
  %% Shared Types and API Boundary
  %% ============================
  sharedTypes["HZZH-Types (Versioned Packages)"]
  apiEndpoint["Signature-be API Endpoint"]

  %% Frontend service layer talks to API
  services --> apiEndpoint

  %% API endpoint routes into backend handlers
  apiEndpoint --> envHandlers
  apiEndpoint --> docHandlers
  apiEndpoint --> recHandlers
  apiEndpoint --> auditHandlers
  apiEndpoint --> healthHandlers

  %% Shared types used by frontend and backend validation
  services --- sharedTypes
  validationLib --- sharedTypes
