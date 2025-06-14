export class NotFoundError extends Error {
    constructor(resource) {
      super(`${resource} non trouvé`);
      this.name = 'NotFoundError';
      this.statusCode = 404;
    }
  }
  
  export class ValidationError extends Error {
    constructor(errors) {
      super('Erreur de validation');
      this.name = 'ValidationError';
      this.statusCode = 400;
      this.errors = errors;
    }
  }
  
  export class BadRequestError extends Error {
    constructor(message = 'Requête invalide') {
      super(message);
      this.name = 'BadRequestError';
      this.statusCode = 400;
    }
  }
  

