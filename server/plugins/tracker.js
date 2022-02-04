var _ = require('lodash');

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }else if (typeof objValue === 'number'){
    return objValue + srcValue;
  }
}

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
        // console.log('execution did start');
        return {
          willResolveField({source, args, context, info}) {
            // console.log('execution did resolve, field name ' + info.fieldName, info.path);
            const start = performance.now();
            return (error, result) => {
              const end = performance.now();

              let itemPerformance = {};
              itemPerformance[info.fieldName] = {'time': [], trips: 0};
              itemPerformance[info.fieldName].time.push(end - start);
              itemPerformance[info.fieldName].trips += 1;

              let current = info.path;

              while (current !== undefined) {
                if (current.typename !== undefined){
                  const temp = {};
                  temp[current.typename] = itemPerformance;
                  itemPerformance = temp;
                }
                current = current.prev;
              }

              _.mergeWith(performanceData, itemPerformance, customizer);

              if (error) {
                console.log(`It failed with ${error}`);
              } 
              else {
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