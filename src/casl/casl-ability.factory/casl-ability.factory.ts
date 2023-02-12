import { Ability, InferSubjects } from "@casl/ability";
import { AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability/dist/types";
import { Injectable } from "@nestjs/common";
import { UserDTO } from "src/dto/user.dto";
import { Permissions } from "src/enum/permission.enum";

type Subjects = InferSubjects<typeof Book | typeof UserDTO> | 'all';

export type AppAbility = Ability<[Permissions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserDTO) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Permissions, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.type == "administrador") {
      can(Permissions.Manage, 'all'); // read-write access to everything
    } else {
      can(Permissions.Get, 'all'); // read-only access to everything
    }
    
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}