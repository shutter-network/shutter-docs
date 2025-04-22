export default {
  shutterSidebar: [
    {
      type: "category",
      label: "Shutter Network",
      collapsible: true,
      collapsed: true,
      className: "sidebar-item",
      items: ["shutter/index", "shutter/products", "shutter/integrations"],
    },
    {
      type: "category",
      label: "Research",
      collapsible: true,
      collapsed: true,
      className: "sidebar-title",
      items: [
        "shutter/research/the_road_towards_an_encrypted_mempool_on_ethereum",
        "shutter/research/shutterized_beacon_chain",
        "shutter/research/viability_integrating_enc_mempool_op_stack",
        "shutter/research/decision_template_for_enc_mempool_ops",
        "shutter/research/transaction_ordering_in_amm",
      ],
    },
  ],

  daoSidebar: [
    {
      type: "category",
      label: "Shutter DAO",
      collapsible: true,
      collapsed: true,
      items: ["dao/index"],
    },
    {
      type: "category",
      label: "Shutter DAO 0x36",
      collapsed: false,
      className: "sidebar-title",
      items: ["dao/0x36/index"],
    },
  ],

  protocolSidebar: [
    {
      type: "category",
      label: "Shutter Protocol",
      collapsed: false,
      items: ["protocol/index", "protocol/overview"],
    },
    {
      type: "category",
      label: "Shutter API",
      collapsed: false,
      className: "sidebar-title",
      items: ["protocol/api/index", "protocol/api/use_cases", "protocol/api/how_it_works", "protocol/api/get_started", "protocol/api/glossary"],
    },
    {
      type: "category",
      label: "Tutorials",
      collapsible: true,
      collapsed: false,
      className: "sidebar-title",
      items: [
        "shutter-api-examples/hello-world/README", "shutter-api-examples/rock-paper-scissors/README"
      ],
    },
  ],
};
