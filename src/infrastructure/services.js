import Datastoremanager from "./Datastoremanager";
import Buchungsmanager from "./Buchungsmanager";
import AppInitialisierer from "./AppInitialisierer";
import Kontomanager from "./Kontomanager";

export default {
  datastoremanager: new Datastoremanager(),
  appInitialisierer: new AppInitialisierer(),
  buchungsmanager: new Buchungsmanager(),
  kontomanager: new Kontomanager(),
}
