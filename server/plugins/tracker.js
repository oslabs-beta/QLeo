module.exports = {
  requestDidStart(requestContext) {
    const start = Date.now();
    let op;
    const performanceData = {};
  
    return {
      didResolveOperation (context) {
        op = context.operationName;
      },
      executionDidStart(context){
        return {
          willResolveField({source, args, context, info}) {
            const start = performance.now();
            return (error, result) => {
              const end = performance.now();
              if (performanceData[info.parentType.name] === undefined)  performanceData[info.parentType.name] = {};
              if (performanceData[info.parentType.name][info.fieldName] === undefined) performanceData[info.parentType.name][info.fieldName] = {'time': [], 'trips':0};
              performanceData[info.parentType.name][info.fieldName].time.push(end - start);
              performanceData[info.parentType.name][info.fieldName].trips += 1;
              if (error) {
                console.log(`It failed with ${error}`);
              } else {
                console.log(`It returned ${result}`);
              }
            };
          },
        };
      },
      willSendResponse (context) {
        // console.log(context);
        const stop = Date.now();
        const elapsed = stop - start;
        const size = JSON.stringify(context.response).length * 2;
        performanceData.queryTime = elapsed;
        context.response.extensions = {performanceData};
          
        console.log(
          `Operation ${op} completed in ${elapsed} ms and returned ${size} bytes`
        );
      }
    };
  },
};