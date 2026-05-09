
export interface Media {
  type: 'image' | 'video';
  url: string;
  caption?: string;
  thumbnail?: string;
}

export interface President {
  id: number;
  key: string;
  term: string;
  party: string;
  portrait: string;
  startYear: number;
  endYear: number;
  gallery: Media[];
}

const rawData: President[] = [
  {
    "id": 1,
    "key": "washington",
    "term": "1789-1797",
    "party": "Federalist",
    "portrait": "/images/presidents/george_washington.jpg",
    "startYear": 1789,
    "endYear": 1797,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=3&autoplay=0",
        "caption": "America: The Story of Us - Westward (1789-1825)"
      }
    ]
  },
  {
    "id": 2,
    "key": "adams_john",
    "term": "1797-1801",
    "party": "Federalist",
    "portrait": "/images/presidents/john_adams.jpg",
    "startYear": 1797,
    "endYear": 1801,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=3&autoplay=0",
        "caption": "America: The Story of Us - Westward (1789-1825)"
      }
    ]
  },
  {
    "id": 3,
    "key": "jefferson",
    "term": "1801-1809",
    "party": "Democratic-Republican",
    "portrait": "/images/presidents/thomas_jefferson.jpg",
    "startYear": 1801,
    "endYear": 1809,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=3&autoplay=0",
        "caption": "America: The Story of Us - Westward (1789-1825)"
      }
    ]
  },
  {
    "id": 4,
    "key": "madison",
    "term": "1809-1817",
    "party": "Democratic-Republican",
    "portrait": "/images/presidents/james_madison.jpg",
    "startYear": 1809,
    "endYear": 1817,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=3&autoplay=0",
        "caption": "America: The Story of Us - Westward (1789-1825)"
      }
    ]
  },
  {
    "id": 5,
    "key": "monroe",
    "term": "1817-1825",
    "party": "Democratic-Republican",
    "portrait": "/images/presidents/james_monroe.jpg",
    "startYear": 1817,
    "endYear": 1825,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=3&autoplay=0",
        "caption": "America: The Story of Us - Westward (1789-1825)"
      }
    ]
  },
  {
    "id": 6,
    "key": "adams_jq",
    "term": "1825-1829",
    "party": "Democratic-Republican",
    "portrait": "/images/presidents/john_quincy_adams.jpg",
    "startYear": 1825,
    "endYear": 1829,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 7,
    "key": "jackson",
    "term": "1829-1837",
    "party": "Democratic",
    "portrait": "/images/presidents/andrew_jackson.jpg",
    "startYear": 1829,
    "endYear": 1837,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 8,
    "key": "van_buren",
    "term": "1837-1841",
    "party": "Democratic",
    "portrait": "/images/presidents/martin_van_buren.jpg",
    "startYear": 1837,
    "endYear": 1841,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 9,
    "key": "harrison_wh",
    "term": "1841-1841",
    "party": "Whig",
    "portrait": "/images/presidents/william_henry_harrison.jpg",
    "startYear": 1841,
    "endYear": 1841,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 10,
    "key": "tyler",
    "term": "1841-1845",
    "party": "Whig",
    "portrait": "/images/presidents/john_tyler.jpg",
    "startYear": 1841,
    "endYear": 1845,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 11,
    "key": "polk",
    "term": "1845-1849",
    "party": "Democratic",
    "portrait": "/images/presidents/james_k_polk.jpg",
    "startYear": 1845,
    "endYear": 1849,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 12,
    "key": "taylor",
    "term": "1849-1850",
    "party": "Whig",
    "portrait": "/images/presidents/zachary_taylor.jpg",
    "startYear": 1849,
    "endYear": 1850,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 13,
    "key": "fillmore",
    "term": "1850-1853",
    "party": "Whig",
    "portrait": "/images/presidents/millard_fillmore.jpg",
    "startYear": 1850,
    "endYear": 1853,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 14,
    "key": "pierce",
    "term": "1853-1857",
    "party": "Democratic",
    "portrait": "/images/presidents/franklin_pierce.jpg",
    "startYear": 1853,
    "endYear": 1857,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 15,
    "key": "buchanan",
    "term": "1857-1861",
    "party": "Democratic",
    "portrait": "/images/presidents/james_buchanan.jpg",
    "startYear": 1857,
    "endYear": 1861,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=4&autoplay=0",
        "caption": "America: The Story of Us - Division (1825-1860)"
      }
    ]
  },
  {
    "id": 16,
    "key": "lincoln",
    "term": "1861-1865",
    "party": "Republican",
    "portrait": "/images/presidents/abraham_lincoln.jpg",
    "startYear": 1861,
    "endYear": 1865,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=5&autoplay=0",
        "caption": "America: The Story of Us - Civil War (1860-1865)"
      }
    ]
  },
  {
    "id": 17,
    "key": "johnson_a",
    "term": "1865-1869",
    "party": "National Union",
    "portrait": "/images/presidents/andrew_johnson.jpg",
    "startYear": 1865,
    "endYear": 1869,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=6&autoplay=0",
        "caption": "America: The Story of Us - Heartland (1865-1890)"
      }
    ]
  },
  {
    "id": 18,
    "key": "grant",
    "term": "1869-1877",
    "party": "Republican",
    "portrait": "/images/presidents/ulysses_s_grant.jpg",
    "startYear": 1869,
    "endYear": 1877,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=6&autoplay=0",
        "caption": "America: The Story of Us - Heartland (1865-1890)"
      }
    ]
  },
  {
    "id": 19,
    "key": "hayes",
    "term": "1877-1881",
    "party": "Republican",
    "portrait": "/images/presidents/rutherford_b_hayes.jpg",
    "startYear": 1877,
    "endYear": 1881,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=6&autoplay=0",
        "caption": "America: The Story of Us - Heartland (1865-1890)"
      }
    ]
  },
  {
    "id": 20,
    "key": "garfield",
    "term": "1881-1881",
    "party": "Republican",
    "portrait": "/images/presidents/james_a_garfield.jpg",
    "startYear": 1881,
    "endYear": 1881,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=6&autoplay=0",
        "caption": "America: The Story of Us - Heartland (1865-1890)"
      }
    ]
  },
  {
    "id": 21,
    "key": "arthur",
    "term": "1881-1885",
    "party": "Republican",
    "portrait": "/images/presidents/chester_a_arthur.jpg",
    "startYear": 1881,
    "endYear": 1885,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=6&autoplay=0",
        "caption": "America: The Story of Us - Heartland (1865-1890)"
      }
    ]
  },
  {
    "id": 22,
    "key": "cleveland",
    "term": "1885-1889",
    "party": "Democratic",
    "portrait": "/images/presidents/grover_cleveland.jpg",
    "startYear": 1885,
    "endYear": 1889,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=6&autoplay=0",
        "caption": "America: The Story of Us - Heartland (1865-1890)"
      }
    ]
  },
  {
    "id": 23,
    "key": "harrison_b",
    "term": "1889-1893",
    "party": "Republican",
    "portrait": "/images/presidents/benjamin_harrison.jpg",
    "startYear": 1889,
    "endYear": 1893,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=6&autoplay=0",
        "caption": "America: The Story of Us - Heartland (1865-1890)"
      }
    ]
  },
  {
    "id": 24,
    "key": "cleveland_2",
    "term": "1893-1897",
    "party": "Democratic",
    "portrait": "/images/presidents/grover_cleveland.jpg",
    "startYear": 1893,
    "endYear": 1897,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=7&autoplay=0",
        "caption": "America: The Story of Us - Cities (1890-1915)"
      }
    ]
  },
  {
    "id": 25,
    "key": "mckinley",
    "term": "1897-1901",
    "party": "Republican",
    "portrait": "/images/presidents/william_mckinley.jpg",
    "startYear": 1897,
    "endYear": 1901,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=7&autoplay=0",
        "caption": "America: The Story of Us - Cities (1890-1915)"
      }
    ]
  },
  {
    "id": 26,
    "key": "teddy_roosevelt",
    "term": "1901-1909",
    "party": "Republican",
    "portrait": "/images/presidents/theodore_roosevelt.jpg",
    "startYear": 1901,
    "endYear": 1909,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=7&autoplay=0",
        "caption": "America: The Story of Us - Cities (1890-1915)"
      }
    ]
  },
  {
    "id": 27,
    "key": "taft",
    "term": "1909-1913",
    "party": "Republican",
    "portrait": "/images/presidents/william_howard_taft.jpg",
    "startYear": 1909,
    "endYear": 1913,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=7&autoplay=0",
        "caption": "America: The Story of Us - Cities (1890-1915)"
      }
    ]
  },
  {
    "id": 28,
    "key": "wilson",
    "term": "1913-1921",
    "party": "Democratic",
    "portrait": "/images/presidents/woodrow_wilson.jpg",
    "startYear": 1913,
    "endYear": 1921,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=7&autoplay=0",
        "caption": "America: The Story of Us - Cities (1890-1915)"
      }
    ]
  },
  {
    "id": 29,
    "key": "harding",
    "term": "1921-1923",
    "party": "Republican",
    "portrait": "/images/presidents/warren_g_harding.jpg",
    "startYear": 1921,
    "endYear": 1923,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=8&autoplay=0",
        "caption": "America: The Story of Us - Boom (1915-1929)"
      }
    ]
  },
  {
    "id": 30,
    "key": "coolidge",
    "term": "1923-1929",
    "party": "Republican",
    "portrait": "/images/presidents/calvin_coolidge.jpg",
    "startYear": 1923,
    "endYear": 1929,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=8&autoplay=0",
        "caption": "America: The Story of Us - Boom (1915-1929)"
      }
    ]
  },
  {
    "id": 31,
    "key": "hoover",
    "term": "1929-1933",
    "party": "Republican",
    "portrait": "/images/presidents/herbert_hoover.jpg",
    "startYear": 1929,
    "endYear": 1933,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=9&autoplay=0",
        "caption": "America: The Story of Us - Bust (1929-1940)"
      }
    ]
  },
  {
    "id": 32,
    "key": "fdr",
    "term": "1933-1945",
    "party": "Democratic",
    "portrait": "/images/presidents/franklin_d_roosevelt.jpg",
    "startYear": 1933,
    "endYear": 1945,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1bb411j7R6&page=1&high_quality=1",
        "caption": "Pearl Harbor Speech (Bilibili)"
      }
    ]
  },
  {
    "id": 33,
    "key": "truman",
    "term": "1945-1953",
    "party": "Democratic",
    "portrait": "/images/presidents/harry_s_truman.jpg",
    "startYear": 1945,
    "endYear": 1953,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=11&autoplay=0",
        "caption": "America: The Story of Us - Superpower (1945-1980)"
      }
    ]
  },
  {
    "id": 34,
    "key": "eisenhower",
    "term": "1953-1961",
    "party": "Republican",
    "portrait": "/images/presidents/dwight_d_eisenhower.jpg",
    "startYear": 1953,
    "endYear": 1961,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=11&autoplay=0",
        "caption": "America: The Story of Us - Superpower (1945-1980)"
      }
    ]
  },
  {
    "id": 35,
    "key": "jfk",
    "term": "1961-1963",
    "party": "Democratic",
    "portrait": "/images/presidents/john_f_kennedy.jpg",
    "startYear": 1961,
    "endYear": 1963,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=11&autoplay=0",
        "caption": "America: The Story of Us - Superpower (1945-1980)"
      }
    ]
  },
  {
    "id": 36,
    "key": "lbj",
    "term": "1963-1969",
    "party": "Democratic",
    "portrait": "/images/presidents/lyndon_b_johnson.jpg",
    "startYear": 1963,
    "endYear": 1969,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=11&autoplay=0",
        "caption": "America: The Story of Us - Superpower (1945-1980)"
      }
    ]
  },
  {
    "id": 37,
    "key": "nixon",
    "term": "1969-1974",
    "party": "Republican",
    "portrait": "/images/presidents/richard_nixon.jpg",
    "startYear": 1969,
    "endYear": 1974,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=11&autoplay=0",
        "caption": "America: The Story of Us - Superpower (1945-1980)"
      }
    ]
  },
  {
    "id": 38,
    "key": "ford",
    "term": "1974-1977",
    "party": "Republican",
    "portrait": "/images/presidents/gerald_ford.jpg",
    "startYear": 1974,
    "endYear": 1977,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=11&autoplay=0",
        "caption": "America: The Story of Us - Superpower (1945-1980)"
      }
    ]
  },
  {
    "id": 39,
    "key": "carter",
    "term": "1977-1981",
    "party": "Democratic",
    "portrait": "/images/presidents/jimmy_carter.jpg",
    "startYear": 1977,
    "endYear": 1981,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=11&autoplay=0",
        "caption": "America: The Story of Us - Superpower (1945-1980)"
      }
    ]
  },
  {
    "id": 40,
    "key": "reagan",
    "term": "1981-1989",
    "party": "Republican",
    "portrait": "/images/presidents/ronald_reagan.jpg",
    "startYear": 1981,
    "endYear": 1989,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=12&autoplay=0",
        "caption": "America: The Story of Us - Millennium (1980-2010)"
      }
    ]
  },
  {
    "id": 41,
    "key": "bush_hw",
    "term": "1989-1993",
    "party": "Republican",
    "portrait": "/images/presidents/george_h_w_bush.jpg",
    "startYear": 1989,
    "endYear": 1993,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=12&autoplay=0",
        "caption": "America: The Story of Us - Millennium (1980-2010)"
      }
    ]
  },
  {
    "id": 42,
    "key": "clinton",
    "term": "1993-2001",
    "party": "Democratic",
    "portrait": "/images/presidents/bill_clinton.jpg",
    "startYear": 1993,
    "endYear": 2001,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=12&autoplay=0",
        "caption": "America: The Story of Us - Millennium (1980-2010)"
      }
    ]
  },
  {
    "id": 43,
    "key": "bush_w",
    "term": "2001-2009",
    "party": "Republican",
    "portrait": "/images/presidents/george_w_bush.jpg",
    "startYear": 2001,
    "endYear": 2009,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1pk4y1z7Bk&page=12&autoplay=0",
        "caption": "America: The Story of Us - Millennium (1980-2010)"
      }
    ]
  },
  {
    "id": 44,
    "key": "obama",
    "term": "2009-2017",
    "party": "Democratic",
    "portrait": "/images/presidents/barack_obama.jpg",
    "startYear": 2009,
    "endYear": 2017,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV14f4y1672W&page=1&autoplay=0",
        "caption": "2008 Victory Speech (Chicago)"
      }
    ]
  },
  {
    "id": 45,
    "key": "trump",
    "term": "2017-2021",
    "party": "Republican",
    "portrait": "/images/presidents/donald_trump.jpg",
    "startYear": 2017,
    "endYear": 2021,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1hs411b7BU&page=1&high_quality=1",
        "caption": "Inaugural Address (Bilibili)"
      }
    ]
  },
  {
    "id": 46,
    "key": "biden",
    "term": "2021-2025",
    "party": "Democratic",
    "portrait": "/images/presidents/joe_biden.jpg",
    "startYear": 2021,
    "endYear": 2025,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1q3411C7y9&page=1&autoplay=0",
        "caption": "Inaugural Address (2021)"
      }
    ]
  },
  {
    "id": 47,
    "key": "trump_2",
    "term": "2025-2029",
    "party": "Republican",
    "portrait": "/images/presidents/donald_trump.jpg",
    "startYear": 2025,
    "endYear": 2029,
    "gallery": [
      {
        "type": "video",
        "url": "https://player.bilibili.com/player.html?bvid=BV1AmD3YMEzC&page=1&autoplay=0",
        "caption": "2024 Victory Speech (Full)"
      }
    ]
  }
];

export const presidentsData = rawData;
export default rawData;
