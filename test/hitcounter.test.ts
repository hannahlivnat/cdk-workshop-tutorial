// ==================================================================
// npm install --save-dev jest @types/jest @aws-cdk/assert
// npm run build && npx jest
// ==================================================================


import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import * as lambda from '@aws-cdk/aws-lambda';

import { HitCounter } from '../lib/hitcounter';

test('DynamoDB Table Created', () => {
  const stack = new cdk.Stack();
  // When
  new HitCounter(stack, 'MyTestConstruct', {
    downstream: new lambda.Function(stack, 'TestFunction', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'lambda.handler',
      code: lambda.Code.fromInline('test')
    })
  });
  // Then
  expectCDK(stack).to(haveResource("AWS::DynamoDB::Table"));
});