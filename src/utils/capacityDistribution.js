// src/utils/capacityDistribution.js
export const getCapacityDistribution = (products) => {
    const distribution = {};
  
    products.forEach((product) => {
      if (product.data && product.data.capacity) {
        const capacity = product.data.capacity;
        if (distribution[capacity]) {
          distribution[capacity]++;
        } else {
          distribution[capacity] = 1;
        }
      }
    });
  
    return distribution;
  };
  