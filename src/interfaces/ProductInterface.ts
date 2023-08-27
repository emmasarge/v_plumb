export interface ProductList {
  id: string;
  productName: string;
  price: {
    currencyCode: string;
    priceIncTax: number;
    priceExTax: number;
    isOnPromtion: boolean;
  };
  description: string;
  defaultCategory: {
    name: string;
    slug: string;
  };
  slug: string;
  reviewsCount: number;
  averageRating: number;
  image: {
    url: string;
    attributes: {
      imageAltText: string;
    };
  };
  attributes: {
    isNew: boolean;
    isBestSeller: boolean;
    isRecommended: boolean;
  }
}

export interface PaginatedProducts {
  pagination: {
    from: number;
    size: number;
    sortType: number;
    total: number;
    currentPage: number;
    totalPages: number;
    totalRecords: number;
  };
 
}

export interface ProductFacets {
  facets: {
    displayName: string;
    identifier: string;
    options: {
      displayValue: string;
      priority: number;
      productCount: number;
      value: {
        gte: number;
        lt: number;
      };
    };
  };
}
