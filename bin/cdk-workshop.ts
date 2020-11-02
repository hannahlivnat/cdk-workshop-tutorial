#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';

const app = new cdk.App();
new CdkWorkshopStack(app, 'CdkWorkshopStack');

// ===========================================================
// This is the app's entry point. It loads and instantiates
// CdkWorkshopStack class from lib/cdk-workshop-stack.ts file. 
// ===========================================================

