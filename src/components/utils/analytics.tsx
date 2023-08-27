export function analytics_addToCart(item_name: string, product_id: string) {
    try {
      (window as any).dataLayer.push({ event: "item_added_to_cart", item_name: item_name, product_id: product_id  });
    } catch (error) {
      // Handle the error
    }
  }

  export function analytics_clickOnProduct(item_name: string,product_id: string) {
    try {
      (window as any).dataLayer.push({ event: "clicked_product_to_product_page", item_name: item_name, product_id: product_id  });
    } catch (error) {
      // Handle the error
    }
  }