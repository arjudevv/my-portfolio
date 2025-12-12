export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  parameters?: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses: ApiResponse[];
  example?: {
    curl: string;
    response: object;
  };
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  in: 'query' | 'path' | 'header';
}

export interface ApiRequestBody {
  contentType: string;
  schema: object;
  example?: object;
}

export interface ApiResponse {
  status: number;
  description: string;
  schema?: object;
  example?: object;
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    path: '/api/users',
    method: 'GET',
    description: 'Get a list of all users with pagination support',
    parameters: [
      {
        name: 'page',
        type: 'number',
        required: false,
        description: 'Page number for pagination',
        in: 'query',
      },
      {
        name: 'limit',
        type: 'number',
        required: false,
        description: 'Number of items per page',
        in: 'query',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Successfully retrieved users',
        example: {
          users: [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
          ],
          pagination: { page: 1, limit: 10, total: 2 },
        },
      },
    ],
    example: {
      curl: "curl -X GET 'https://api.example.com/api/users?page=1&limit=10' \\\n  -H 'Authorization: Bearer YOUR_TOKEN'",
      response: {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
        ],
        pagination: { page: 1, limit: 10, total: 1 },
      },
    },
  },
  {
    path: '/api/users/{id}',
    method: 'GET',
    description: 'Get a specific user by ID',
    parameters: [
      {
        name: 'id',
        type: 'string',
        required: true,
        description: 'User ID',
        in: 'path',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Successfully retrieved user',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: '2024-01-01T00:00:00Z',
        },
      },
      {
        status: 404,
        description: 'User not found',
      },
    ],
    example: {
      curl: "curl -X GET 'https://api.example.com/api/users/1' \\\n  -H 'Authorization: Bearer YOUR_TOKEN'",
      response: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      },
    },
  },
  {
    path: '/api/users',
    method: 'POST',
    description: 'Create a new user',
    requestBody: {
      contentType: 'application/json',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['name', 'email', 'password'],
      },
      example: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securePassword123',
      },
    },
    responses: [
      {
        status: 201,
        description: 'User created successfully',
        example: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          createdAt: '2024-01-01T00:00:00Z',
        },
      },
      {
        status: 400,
        description: 'Invalid input data',
      },
    ],
    example: {
      curl: "curl -X POST 'https://api.example.com/api/users' \\\n  -H 'Content-Type: application/json' \\\n  -H 'Authorization: Bearer YOUR_TOKEN' \\\n  -d '{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"securePassword123\"}'",
      response: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: '2024-01-01T00:00:00Z',
      },
    },
  },
  {
    path: '/api/auth/login',
    method: 'POST',
    description: 'Authenticate user and receive JWT token',
    requestBody: {
      contentType: 'application/json',
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['email', 'password'],
      },
      example: {
        email: 'john@example.com',
        password: 'securePassword123',
      },
    },
    responses: [
      {
        status: 200,
        description: 'Authentication successful',
        example: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          refreshToken: 'refresh_token_here',
          user: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      },
      {
        status: 401,
        description: 'Invalid credentials',
      },
    ],
    example: {
      curl: "curl -X POST 'https://api.example.com/api/auth/login' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"email\":\"john@example.com\",\"password\":\"securePassword123\"}'",
      response: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'refresh_token_here',
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
    },
  },
  {
    path: '/api/projects',
    method: 'GET',
    description: 'Get a list of projects',
    parameters: [
      {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Filter by project status',
        in: 'query',
      },
    ],
    responses: [
      {
        status: 200,
        description: 'Successfully retrieved projects',
        example: {
          projects: [
            {
              id: 1,
              title: 'Project 1',
              status: 'active',
              description: 'Project description',
            },
          ],
        },
      },
    ],
    example: {
      curl: "curl -X GET 'https://api.example.com/api/projects?status=active' \\\n  -H 'Authorization: Bearer YOUR_TOKEN'",
      response: {
        projects: [
          {
            id: 1,
            title: 'Project 1',
            status: 'active',
            description: 'Project description',
          },
        ],
      },
    },
  },
];
