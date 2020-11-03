import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export interface HitCounterProps {
  // Function to count url hits
  downstream: lambda.Function;
}

export class HitCounter extends cdk.Construct {
  // Allows accessing of counter function
  public readonly handler: lambda.Function;

  // Lets hitaccess dynamodb table be public accessible
  public readonly table: dynamodb.Table;

  constructor(scope: cdk.Construct, id: string, props: HitCounterProps) {
    super(scope, id);

    const table = new dynamodb.Table(this, 'Hits', {
      partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING },
      serverSideEncryption: true
    });
    this.table = table;

    this.handler = new lambda.Function(this, 'HitCounterHandler', {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'hitcounter.handler',
      code: lambda.Code.fromAsset('lambda'),
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName
      }
    });

    // Grant lambda role read/write permissions to table
    table.grantReadWriteData(this.handler);

    // Grant lambda role invoke permissions to downstream function
    props.downstream.grantInvoke(this.handler);
  }
}