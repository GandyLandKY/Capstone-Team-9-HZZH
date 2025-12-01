```mermaid
flowchart LR

  %% Development stack
  subgraph Development
    devBrowser["Browser User (Dev)"]
    devFE["Signature Frontend (Dev, Next.js)"]
    devAPI["API Gateway / HTTP (Dev)"]
    devLambdas["Signature-be Lambdas (Dev)"]
    devDDB["DynamoDB Table (Dev)"]
    devS3["S3 Bucket (Dev)"]

    devBrowser --> devFE
    devFE --> devAPI
    devAPI --> devLambdas
    devLambdas --> devDDB
    devLambdas --> devS3
  end

  %% Production stack
  subgraph Production
    prodBrowser["Browser User (Prod)"]
    prodFE["Signature Frontend (Prod, Next.js)"]
    prodAPI["API Gateway / HTTP (Prod)"]
    prodLambdas["Signature-be Lambdas (Prod)"]
    prodDDB["DynamoDB Table (Prod)"]
    prodS3["S3 Bucket (Prod)"]

    prodBrowser --> prodFE
    prodFE --> prodAPI
    prodAPI --> prodLambdas
    prodLambdas --> prodDDB
    prodLambdas --> prodS3
  end

  %% Shared HZZH Types (versioned packages)
  hzzhTypes["HZZH-Types (Versioned Packages)"]

  hzzhTypes --- devFE
  hzzhTypes --- prodFE
  hzzhTypes --- devLambdas
  hzzhTypes --- prodLambdas

  %% HZZH platform context
  subgraph HZZH_Platform["HZZH Platform Context"]
    marketing["HZZH Marketing Website"]
    moduleA["Other HZZH Module A"]
    moduleB["Other HZZH Module B"]
  end

  %% Context relationships (outside core request flow)
  marketing -. Shares branding & navigation .- devFE
  marketing -. Shares branding & navigation .- prodFE

  moduleA -. Uses same stack & tooling .- Development
  moduleB -. Uses same stack & tooling .- Production

