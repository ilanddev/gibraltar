import { VappData } from '../../../../src/components/vapp';
import { OperatingSystem } from 'iland-sdk';

/**
 * Placeholder vApp data for the Vapp Static Demo
 */

  // 0. nat-routed vapp network
  // 1. isolated vapp network
  // 2. multiple isolated vapp networks
  // 3. long label name
  // 4. no vapp network
  // 5. vapp network with no attached vms or vnics
  // 6. vm with multiple unattached vnics
  // 7. max amount of vnics
  // 8. no vapp network or vnics
  // 9. attached vnic that is disconnected
  // 10. multiple nat-routed vapp networks
  // 11. long vms list with scrollbar
  // 12. long vms list and nat-routed vapp network with scrollbar
  // 13. multiple vms with max amount of vnics - width edge case
  // 14. many vms attached to their own network - width edge case
  // 15. variations for vnics on multiple vapp networks
  // 16. variations for unattached vnics
  // 17. nat-routed vApp network with no attached vms and vnics
  // 18. vapp with no vapp networks or vms
  // 19. network-less vm in a list that has other vapp networks
export const placeholderArrayOfVappData: Array<VappData> = [
  // 0. nat-routed vapp network
  {
    uuid: '',
    name: 'Coke RES & BURST',
    vapp_networks: [
      {
        uuid: '0',
        name: '172.16.55.0 Failover Network',
        vapp_uuid: '',
        fence_mode: 'NAT_ROUTED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 1,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 2,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 3,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 4,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 5,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 1. isolated vapp network
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [
      {
        uuid: '0',
        name: 'JTRAN 172.16.100.0/24',
        vapp_uuid: '',
        fence_mode: 'ISOLATED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'JTRAN 172.16.100.0/24',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 2. multiple isolated vapp networks
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [
      {
        uuid: '0',
        name: 'JTRAN 172.16.100.0/24',
        vapp_uuid: '',
        fence_mode: 'ISOLATED'
      },
      {
        uuid: '1',
        name: 'JTRAN 172.16.100.0/24 2',
        vapp_uuid: '',
        fence_mode: 'ISOLATED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'JTRAN 172.16.100.0/24',
            is_connected: true
          },
          {
            vnic_id: 0,
            network_name: 'JTRAN 172.16.100.0/24 2',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 3. long label name
  {
    uuid: '',
    name: 'BillingResourceNonRegressionoooo',
    vapp_networks: [
      {
        uuid: '0',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '1',
        name: 'B',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: 'B',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 4. no vapp network
  {
    uuid: '',
    name: 'Delete me build',
    vapp_networks: [],
    vms: [
      {
        uuid: '',
        name: 'Delete me VMs Lin',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '',
            is_connected: false
          }
        ]
      }
    ]
  },
  // 5. vapp network with no attached vms or vnics
  {
    uuid: '',
    name: 'Coke RES & BURST',
    vapp_networks: [
      {
        uuid: '0',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: []
  },
  // 6. vm with multiple unattached vnics
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [
      {
        uuid: '0',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 1,
            network_name: 'A',
            is_connected: true
          },
          {
            vnic_id: 2,
            network_name: '',
            is_connected: false
          }
        ]
      }
    ]
  },
  // 7. max amount of vnics
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [
      {
        uuid: '0',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 2,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 3,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 4,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 5,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 6,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 7,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 8,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 9,
            network_name: '',
            is_connected: false
          }
        ]
      }
    ]
  },
  // 8. no vapp network or vnics
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [],
    vms: [
      {
        uuid: '0',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: []
      }
    ]
  },
  // 9. attached vnic that is disconnected
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [
      {
        uuid: '0',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: false
          }
        ]
      }
    ]
  },
  // 10. multiple nat-routed vapp networks
  {
    uuid: '',
    name: 'Coke RES & BURST',
    vapp_networks: [
      {
        uuid: '0',
        name: '172.16.55.0 Failover Network 1',
        vapp_uuid: '',
        fence_mode: 'NAT_ROUTED'
      },
      {
        uuid: '1',
        name: '172.16.55.0 Failover Network 2',
        vapp_uuid: '',
        fence_mode: 'NAT_ROUTED'
      },
      {
        uuid: '2',
        name: '172.16.55.0 Failover Network 3',
        vapp_uuid: '',
        fence_mode: 'NAT_ROUTED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network 1',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '172.16.55.0 Failover Network 2',
            is_connected: true
          },
          {
            vnic_id: 2,
            network_name: '172.16.55.0 Failover Network 3',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network 1',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '172.16.55.0 Failover Network 2',
            is_connected: true
          },
          {
            vnic_id: 2,
            network_name: '172.16.55.0 Failover Network 3',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network 1',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '172.16.55.0 Failover Network 2',
            is_connected: true
          },
          {
            vnic_id: 2,
            network_name: '172.16.55.0 Failover Network 3',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 11. long vms list with scrollbar
  {
    uuid: '',
    name: 'Coke RES & BURST',
    vapp_networks: [
      {
        uuid: '0',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 12. long vms list and nat-routed vapp network with scrollbar
  {
    uuid: '',
    name: 'Coke RES & BURST',
    vapp_networks: [
      {
        uuid: '0',
        name: '172.16.55.0 Failover Network',
        vapp_uuid: '',
        fence_mode: 'NAT_ROUTED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '172.16.55.0 Failover Network',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 13. multiple vms with max amount of vnics - width edge case
  {
    uuid: '',
    name: 'BillingResourceNonRegressionoooo',
    vapp_networks: [
      {
        uuid: '0',
        name: '0',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '1',
        name: '1',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '2',
        name: '2',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '3',
        name: '3',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '4',
        name: '4',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '5',
        name: '5',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '6',
        name: '6',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '7',
        name: '7',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '8',
        name: '8',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '9',
        name: '9',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '10',
        name: '10',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '11',
        name: '11',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '12',
        name: '12',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '13',
        name: '13',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '14',
        name: '14',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '15',
        name: '15',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '16',
        name: '16',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '17',
        name: '17',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '18',
        name: '18',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '19',
        name: '19',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '20',
        name: '20',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '21',
        name: '21',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '22',
        name: '22',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '23',
        name: '23',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '24',
        name: '24',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '25',
        name: '25',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '26',
        name: '26',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '27',
        name: '27',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '28',
        name: '28',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '29',
        name: '29',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '0',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '1',
            is_connected: true
          },
          {
            vnic_id: 2,
            network_name: '2',
            is_connected: true
          },
          {
            vnic_id: 3,
            network_name: '3',
            is_connected: true
          },
          {
            vnic_id: 4,
            network_name: '4',
            is_connected: true
          },
          {
            vnic_id: 5,
            network_name: '5',
            is_connected: true
          },
          {
            vnic_id: 6,
            network_name: '6',
            is_connected: true
          },
          {
            vnic_id: 7,
            network_name: '7',
            is_connected: true
          },
          {
            vnic_id: 8,
            network_name: '8',
            is_connected: true
          },
          {
            vnic_id: 9,
            network_name: '9',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '10',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '11',
            is_connected: true
          },
          {
            vnic_id: 2,
            network_name: '12',
            is_connected: true
          },
          {
            vnic_id: 3,
            network_name: '13',
            is_connected: true
          },
          {
            vnic_id: 4,
            network_name: '14',
            is_connected: true
          },
          {
            vnic_id: 5,
            network_name: '15',
            is_connected: true
          },
          {
            vnic_id: 6,
            network_name: '16',
            is_connected: true
          },
          {
            vnic_id: 7,
            network_name: '17',
            is_connected: true
          },
          {
            vnic_id: 8,
            network_name: '18',
            is_connected: true
          },
          {
            vnic_id: 9,
            network_name: '19',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest2',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '20',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '21',
            is_connected: true
          },
          {
            vnic_id: 2,
            network_name: '22',
            is_connected: true
          },
          {
            vnic_id: 3,
            network_name: '23',
            is_connected: true
          },
          {
            vnic_id: 4,
            network_name: '24',
            is_connected: true
          },
          {
            vnic_id: 5,
            network_name: '25',
            is_connected: true
          },
          {
            vnic_id: 6,
            network_name: '26',
            is_connected: true
          },
          {
            vnic_id: 7,
            network_name: '27',
            is_connected: true
          },
          {
            vnic_id: 8,
            network_name: '28',
            is_connected: true
          },
          {
            vnic_id: 9,
            network_name: '29',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 14. many vms attached to their own network - width edge case
  {
    uuid: '',
    name: 'BillingResourceNonRegressionoooo',
    vapp_networks: [
      {
        uuid: '0',
        name: '0',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '1',
        name: '1',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '2',
        name: '2',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '3',
        name: '3',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '4',
        name: '4',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '5',
        name: '5',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '6',
        name: '6',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '7',
        name: '7',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '8',
        name: '8',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '9',
        name: '9',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '10',
        name: '10',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '11',
        name: '11',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '12',
        name: '12',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '0',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '1',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '2',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '3',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '4',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '5',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '6',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '7',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '8',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'Alert Resource Non Regression VM',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '9',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'AutomatedSecurityTest1',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '10',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'CatalogResourceNonRegression1',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '11',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'lin-hytrust-01',
        vapp_uuid: '',
        operatingSystem: 'windows7Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: '12',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 15. variations for vnics on multiple vapp networks
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [
      {
        uuid: '0',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '1',
        name: 'B',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '2',
        name: 'C',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '3',
        name: 'D',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: 'B',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-02',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'C',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-03',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'B',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: 'D',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 16. variations for unattached vnics
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [
      {
        uuid: '1',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '2',
        name: 'B',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '3',
        name: 'C',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'windows-as-01',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 2,
            network_name: '',
            is_connected: false
          },
          {
            vnic_id: 3,
            network_name: '',
            is_connected: false
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-02',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'B',
            is_connected: true
          },
          {
            vnic_id: 1,
            network_name: '',
            is_connected: false
          }
        ]
      },
      {
        uuid: '',
        name: 'windows-as-03',
        vapp_uuid: '',
        operatingSystem: 'ubuntu64Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'C',
            is_connected: true
          }
        ]
      }
    ]
  },
  // 17. nat-routed vApp network with no attached vms and vnics
  {
    uuid: '',
    name: 'Coke RES & BURST',
    vapp_networks: [
      {
        uuid: '0',
        name: '172.16.55.0 Failover Network 1',
        vapp_uuid: '',
        fence_mode: 'NAT_ROUTED'
      }
    ],
    vms: []
  },
  // 18. vapp with no vapp networks or vms
  {
    uuid: '',
    name: 'Coke RES & BURST',
    vapp_networks: [],
    vms: []
  },
  // 19. network-less vm in a list that has other vapp networks
  {
    uuid: '',
    name: 'BC Test vApp',
    vapp_networks: [
      {
        uuid: '0',
        name: 'A',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '1',
        name: 'B',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      },
      {
        uuid: '2',
        name: 'C',
        vapp_uuid: '',
        fence_mode: 'BRIDGED'
      }
    ],
    vms: [
      {
        uuid: '',
        name: 'redhat-as-01',
        vapp_uuid: '',
        operatingSystem: 'redhatGuest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'A',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'debian-as-02',
        vapp_uuid: '',
        operatingSystem: 'debian8Guest',
        vnics: [
          {
            vnic_id: 0,
            network_name: 'B',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'linux-as-03',
        vapp_uuid: '',
        operatingSystem: 'other24xLinux64Guest',
        vnics: [
          {
            vnic_id: 1,
            network_name: 'C',
            is_connected: true
          }
        ]
      },
      {
        uuid: '',
        name: 'arch-as-04',
        vapp_uuid: '',
        operatingSystem: 'btwIUseArch' as OperatingSystem,
        vnics: [
          {
            vnic_id: 0,
            network_name: '',
            is_connected: false
          }
        ]
      }
    ]
  }
];
