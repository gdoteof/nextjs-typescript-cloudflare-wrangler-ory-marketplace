import { Namespace, Context } from "@ory/keto-namespace-types"

class Users implements Namespace {
    related: {
        blockedUsers: Users[];
    }

    permits = {
        view: (ctx: Context): boolean => !this.related.blockedUsers.includes(ctx.subject),
    }
}

class Services implements Namespace {
    related: {
       providers: ServiceProviders[]; 
    }
}

class ServiceProviders implements Namespace {
  related: {
    // the owner of the sevice provider instance
    owners: Users[];

    // Facilities the service provider provides services for
    facilities: Facilities[];

    // Services offered by the service provider
    services: Services[];

    previewers: Users[];
  }

  permits = {
    // Check if a service provider is associated with a facility
    bookFacility: (ctx: Context): boolean => this.related.facilities.includes(ctx.subject),

    // Check if a service provider offers a particular service
    editProfile: (ctx: Context): boolean => this.related.owners.includes(ctx.subject),
  }
}

class Facilities implements Namespace {
  related: {
    // Service providers associated with the facility
    serviceProviders: ServiceProviders[];
  }

  permits = {
    // Check if a facility has a particular service provider
    hasServiceProvider: (ctx: Context): boolean => this.related.serviceProviders.includes(ctx.subject),
  }
}