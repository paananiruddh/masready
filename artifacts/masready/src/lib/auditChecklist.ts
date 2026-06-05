// MASReady Environment Audit Checklist — data definitions
// Self-contained client-side state. No backend required.

export type CheckSeverity = "critical" | "high" | "medium" | "low";
export type CheckStatus = "pending" | "pass" | "fail" | "warn" | "na";
export type AutoCheckType = "sql" | "manual";

export interface CheckItem {
  key: string;
  label: string;
  description: string;
  severity: CheckSeverity;
  autoCheck?: AutoCheckType;
  sqlHint?: string;
  remediation?: string;
  masRef?: string;
}

export interface CheckSection {
  key: string;
  title: string;
  description: string;
  items: CheckItem[];
}

export const AUDIT_SECTIONS: CheckSection[] = [
  {
    key: "delivery_intelligence",
    title: "Delivery Intelligence Readiness",
    description: "Verify the environment captures sufficient operational data to support MASReady delivery intelligence outputs.",
    items: [
      {
        key: "di_version_confirmed",
        label: "Maximo / MAS source version confirmed and documented",
        description: "The current platform version must be confirmed and recorded before any readiness assessment or migration planning begins. For 7.6.x environments targeting MAS, versions below 7.6.1.2 require an interim upgrade step first.",
        severity: "critical",
        autoCheck: "sql",
        sqlHint: "SELECT MAXVALUE FROM MAXVARS WHERE VARNAME IN ('MAXUPG','MAXIMO_VERSION','RELEASE')",
        remediation: "Confirm the installed platform version. For 7.6.x environments below 7.6.1.2, plan an interim upgrade before MAS migration. For MAS environments, confirm the MAS and Manage version from the admin console.",
        masRef: "IBM Docs: Maximo / MAS version confirmation"
      },
      {
        key: "di_automation_scripts",
        label: "Automation scripts inventoried and documented",
        description: "All active automation scripts must be catalogued — launch points, active status, business purpose — to assess MAS compatibility.",
        severity: "high",
        autoCheck: "sql",
        sqlHint: "SELECT AUTOSCRIPTNAME, DESCRIPTION, STATUS, LANGCODE FROM AUTOSCRIPT WHERE STATUS='Active'",
        remediation: "Export full automation script inventory from Application Designer. Document launch points and triggers.",
        masRef: "MASReady Delivery Intelligence – Automation Script Coverage"
      },
      {
        key: "di_cron_tasks",
        label: "Cron task inventory extracted",
        description: "Active cron tasks must be validated for MAS 9 compatibility. Cron scheduling and task framework changed between 7.6 and MAS Manage.",
        severity: "high",
        autoCheck: "sql",
        sqlHint: "SELECT CRONTASKNAME, DESCRIPTION, ACTIVE, CLASSNAME FROM CRONTASKDEF WHERE ACTIVE=1",
        remediation: "Export cron task definitions. Review against MAS 9 supported cron task list.",
        masRef: "MASReady – Cron Task Fingerprint"
      },
      {
        key: "di_object_structures",
        label: "Object structures and publish channels documented",
        description: "Integration object structures define the MIF interface. Unmapped structures will cause silent data loss during integration migration.",
        severity: "high",
        autoCheck: "sql",
        sqlHint: "SELECT OBJECTSTRUCTURE, DESCRIPTION, CONSUMED, PUBLISHED FROM MAXOS WHERE CONSUMED=1 OR PUBLISHED=1",
        remediation: "Export all active object structures and enterprise services. Map to MAS App Connect equivalents.",
        masRef: "MASReady – Integration Fingerprint"
      },
      {
        key: "di_workflows",
        label: "Active workflow processes inventoried",
        description: "Workflow processes that use custom conditions or Java-based routines may require rework for MAS Manage 9.",
        severity: "medium",
        autoCheck: "sql",
        sqlHint: "SELECT PROCESSNAME, DESCRIPTION, ENABLED FROM WFPROCESS WHERE ENABLED=1",
        remediation: "Export enabled workflow process list. Flag those with Java condition classes for redevelopment assessment.",
        masRef: "MASReady – Workflow Coverage"
      },
      {
        key: "di_birt_reports",
        label: "BIRT reports catalogued",
        description: "BIRT reports require source version 7.6.1.3+. Complex BIRT report suites should be reviewed before starting the upgrade.",
        severity: "medium",
        autoCheck: "sql",
        sqlHint: "SELECT REPORTNAME, DESCRIPTION, APPNAME, SOURCETYPE FROM REPORT WHERE SOURCETYPE='BIRT'",
        remediation: "Ensure source version is 7.6.1.3 if BIRT reports are in use. Document report dependencies.",
        masRef: "IBM Community: MAS Upgrade Checklist – Reporting"
      },
      {
        key: "di_doclinks",
        label: "Document link (Doclinks) filesystem paths reviewed",
        description: "Filesystem-based Doclinks will break in containerised MAS unless migrated to Object Storage (Mongo/S3-compatible).",
        severity: "high",
        autoCheck: "sql",
        sqlHint: "SELECT URLTYPE, COUNT(*) AS CNT FROM DOCINFO GROUP BY URLTYPE",
        remediation: "Plan Doclinks migration to IBM Maximo Document Management Object Store before activating MAS Manage.",
        masRef: "MAS 9 Upgrade – Doclinks Migration"
      },
      {
        key: "di_customization_archive",
        label: "Customisation archive prepared (Java, XML, web.xml, DBC, JARs)",
        description: "All Java customisations, XML descriptors, web.xml changes and third-party JARs must be compiled into a customisation archive before the upgrade.",
        severity: "critical",
        remediation: "Use the IBM Maximo Customization Tool to prepare and validate the customisation archive.",
        masRef: "IBM: MAS Upgrade Prerequisites"
      },
    ]
  },
  {
    key: "trust_center",
    title: "Trust Center Compliance",
    description: "Assess environment compliance posture against IBM MAS security, ISO-27001, and internal governance requirements.",
    items: [
      {
        key: "tc_ssl",
        label: "SSL/TLS certificates configured and valid",
        description: "All MAS endpoints must be served over HTTPS with valid certificates. Self-signed certificates are not permitted in production.",
        severity: "critical",
        remediation: "Configure SSL via the MAS Suite Administration or OpenShift ingress controller. Use Let's Encrypt or enterprise CA.",
        masRef: "IBM Docs: MAS SaaS Security"
      },
      {
        key: "tc_ldap_saml",
        label: "LDAP/SAML authentication configuration documented",
        description: "Existing LDAP or SAML configuration must be mapped to MAS SSO equivalents (OIDC default, SAML optional). Gaps cause user lockout post-migration.",
        severity: "critical",
        autoCheck: "manual",
        remediation: "Export LDAP group-to-security-group mapping. Map to MAS User Management identity providers.",
        masRef: "IBM Docs: MAS SSO Configuration"
      },
      {
        key: "tc_security_groups",
        label: "Security groups and profiles exported",
        description: "Current security group definitions (access rights, object restrictions, app access) must be validated before MAS user assignment.",
        severity: "high",
        autoCheck: "sql",
        sqlHint: "SELECT GROUPNAME, DESCRIPTION, AUTOSKIP, INDEPENDENT FROM MAXGROUP",
        remediation: "Export security group profiles. Review AppPoint tier assignment before cutover.",
        masRef: "MASReady – Licence Usage Planning"
      },
      {
        key: "tc_sig_options",
        label: "Signature options and e-signature requirements documented",
        description: "Signature option configurations define controlled transaction requirements. These must survive the database upgrade intact.",
        severity: "medium",
        autoCheck: "sql",
        sqlHint: "SELECT OPTIONNAME, APP, REQUIRESIGOPT FROM SIGOPTION WHERE REQUIRESIGOPT=1",
        remediation: "Document all e-signature requirements per application. Validate post-activation.",
        masRef: "MASReady – Trust Configuration"
      },
      {
        key: "tc_db_audit",
        label: "Database auditing configuration reviewed",
        description: "MAS SaaS environments retain audit logs for 365 days. Customer-managed deployments must configure equivalent retention.",
        severity: "high",
        remediation: "Configure database auditing in PostgreSQL/Db2/Oracle. Ensure 365-day retention to match MAS SaaS standards.",
        masRef: "IBM Docs: MAS SaaS Security – Database Auditing"
      },
      {
        key: "tc_pen_test",
        label: "Penetration test report obtained from IBM PTC",
        description: "IBM does not permit customer-led penetration testing. Annual PTC reports are available on request and should be reviewed by the security team.",
        severity: "medium",
        remediation: "Request the latest IBM MAS PTC penetration test report. Review findings and track remediation timelines.",
        masRef: "IBM Docs: MAS SaaS Security – Penetration Testing"
      },
      {
        key: "tc_iso27001",
        label: "ISO-27001 certificate obtained and reviewed",
        description: "IBM MAS SaaS environments are ISO-27001 certified. Customer-managed MAS deployments must achieve equivalent certification independently.",
        severity: "medium",
        remediation: "Download IBM MAS SaaS ISO-27001 certificate. If customer-managed, initiate independent ISO-27001 assessment.",
        masRef: "IBM Docs: MAS SaaS – ISO-27001"
      },
      {
        key: "tc_rbac",
        label: "Role-based access control (RBAC) posture validated",
        description: "MAS Suite and Application administrators consume AppPoints continuously (reserved). RBAC must be right-sized before migration to avoid licensing overages.",
        severity: "high",
        remediation: "Review administrator user list. Consolidate where possible. Align to minimum required privilege model.",
        masRef: "IBM Docs: MAS 9.1 Licensing – Admin Users"
      },
    ]
  },
  {
    key: "patch_impact",
    title: "Patch & iFix Impact Analysis",
    description: "Assess currently applied patches and iFixes against known MAS 9 compatibility requirements and document impacted configurations.",
    items: [
      {
        key: "pi_integrity_checker",
        label: "Integrity Checker run in REPORT mode — zero errors",
        description: "The Maximo Integrity Checker must return zero errors in REPORT mode. Do not run in REPAIR mode before taking a full database backup.",
        severity: "critical",
        autoCheck: "manual",
        remediation: "Run Integrity Checker from Maximo menu. Export results. Resolve all errors before database activation.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Integrity Checker"
      },
      {
        key: "pi_maxobjectcfg",
        label: "MAXOBJECTCFG pending-change count is zero",
        description: "Pending configuration changes in MAXOBJECTCFG will cause activation failures. Count must be zero before starting the upgrade.",
        severity: "critical",
        autoCheck: "sql",
        sqlHint: "SELECT COUNT(*) AS PENDING FROM MAXOBJECTCFG WHERE STATUS='PENDING'",
        remediation: "Apply all pending configuration changes using Database Configuration before upgrading.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Database Critical Path"
      },
      {
        key: "pi_maxsysindexes",
        label: "MAXSYSINDEXES pending-change count is zero",
        description: "Pending index changes must be cleared before database activation or the upgrade will fail mid-process.",
        severity: "critical",
        autoCheck: "sql",
        sqlHint: "SELECT COUNT(*) AS PENDING FROM MAXSYSINDEXES WHERE STATUS='PENDING'",
        remediation: "Apply pending index changes via Database Configuration before the upgrade window.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Database Critical Path"
      },
      {
        key: "pi_custom_triggers",
        label: "Custom database triggers identified and disabled",
        description: "Custom database triggers must be disabled before the upgrade and carefully re-evaluated for MAS 9 compatibility before re-enabling.",
        severity: "critical",
        autoCheck: "sql",
        sqlHint: "SELECT TRIGGER_NAME, TABLE_NAME, STATUS FROM ALL_TRIGGERS WHERE OWNER='MAXIMO' AND STATUS='ENABLED'",
        remediation: "Document all custom triggers. Disable before upgrade. Review each against MAS Manage data model changes after activation.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Database"
      },
      {
        key: "pi_db_version",
        label: "Database platform and version validated against MAS 9 matrix",
        description: "DB2, Oracle, and PostgreSQL have specific minimum version requirements for MAS 9. Incompatible versions will block activation.",
        severity: "critical",
        remediation: "Check IBM MAS 9 compatibility matrix. Upgrade database if required before MAS deployment.",
        masRef: "IBM Docs: MAS Version Compatibility Matrix"
      },
      {
        key: "pi_db_backup",
        label: "Full database backup and SMP/config backup completed",
        description: "A verified, restorable full database backup must exist before any upgrade steps begin. No exceptions.",
        severity: "critical",
        remediation: "Perform full database backup. Confirm restore capability with a test restore to non-production. Backup SMP home directory.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist"
      },
      {
        key: "pi_ifix_log",
        label: "Applied iFix and SMP patch log extracted",
        description: "The full history of applied iFixes and SMP patches must be documented. Some iFix changes interact with the MAS database activation step.",
        severity: "high",
        autoCheck: "sql",
        sqlHint: "SELECT PMNUM, DESCRIPTION, APPLIEDDATE FROM MAXPMINV ORDER BY APPLIEDDATE DESC",
        remediation: "Export patch log from Maximo. Document any custom iFix DBC scripts applied. Review against MAS 9 known issues list.",
        masRef: "MASReady – Patch Impact Fingerprint"
      },
      {
        key: "pi_jms_kafka",
        label: "JMS to Kafka integration migration assessed",
        description: "MAS replaces JMS message queues with Kafka. All JMS-based integrations must be rearchitected. Authentication methods change to API keys.",
        severity: "high",
        remediation: "Inventory all JMS producers and consumers. Map to Kafka equivalents. Update integration authentication to API key model.",
        masRef: "Interloc: MAS Upgrade Readiness – Integrations"
      },
    ]
  },
  {
    key: "license_planning",
    title: "License Planning Readiness",
    description: "Validate AppPoints sizing requirements across user tiers and add-on installations. Planning visibility only — not IBM-certified compliance advice.",
    items: [
      {
        key: "lp_crontask_deployed",
        label: "AppPoint calculation cron task deployed and running for 30+ days",
        description: "The App Point Licensing Setup application must be installed in the 7.6 environment with its cron task running for at least 30 days to capture accurate peak concurrent usage.",
        severity: "high",
        remediation: "Install the AppPoint calculation tool. Set cron task to run daily at low-usage time (e.g. 11pm). Run for minimum 30 days before exporting estimates.",
        masRef: "How to Calculate Maximo App Points (7.6 & MAS 8+) – IBM Tutorial"
      },
      {
        key: "lp_peak_concurrent",
        label: "Peak concurrent usage report exported from 7.6",
        description: "The AppPoint peak daily consumption report must be exported and analysed. This is the primary input to AppPoint sizing.",
        severity: "critical",
        remediation: "Export AppPoint usage report from the App Point Licensing Setup application. Segment by user tier (Premium/Base/Limited/Self-Service).",
        masRef: "IBM MAS 9.1 Licensing Documentation"
      },
      {
        key: "lp_user_tiers",
        label: "All users mapped to AppPoint tiers (Premium/Base/Limited/Self-Service)",
        description: "Every Maximo user must be classified: Premium (15 pts concurrent), Base (10 pts), Limited (5 pts). Self-Service is 0 pts.",
        severity: "critical",
        autoCheck: "sql",
        sqlHint: "SELECT PERSONID, STATUS, DEFSITE, (SELECT COUNT(*) FROM GROUPUSER GU WHERE GU.USERID=P.PERSONID) AS GROUPCOUNT FROM PERSON P WHERE STATUS='ACTIVE' ORDER BY PERSONID",
        remediation: "Map each active user to their equivalent AppPoint tier based on module access. Use IBM AppPoint conversion ratios.",
        masRef: "IBM MAS 9.1 Licensing – AppPoint Allocation"
      },
      {
        key: "lp_industry_solutions",
        label: "Industry solutions requiring Premium tier identified",
        description: "Industry solutions (Utilities, Civil Infrastructure, Aviation, etc.) require Premium tier (15 pts concurrent / 5 pts authorised). These consume significantly more AppPoints.",
        severity: "high",
        autoCheck: "sql",
        sqlHint: "SELECT APP, DESCRIPTION FROM MAXAPPS WHERE APP IN ('PLUSGAM','PLUSPCS','PLUSNUC','PLUSUTI','PLUSTRANS','PLUSAVIA')",
        remediation: "Identify which industry solutions are installed. Confirm all users needing IS access are allocated Premium AppPoints.",
        masRef: "IBM MAS 9.1 Licensing – Industry Solutions"
      },
      {
        key: "lp_install_apppoints",
        label: "Install-based AppPoints planned (Spatial, Civil, Optimizer, SAP, Oracle connectors)",
        description: "Several add-ons consume fixed AppPoints per installation regardless of user count: Spatial (20), Civil Infrastructure (50), Optimizer (220), SAP Connector (80), Oracle Connector (80).",
        severity: "high",
        remediation: "List all installed add-ons. Add fixed Install AppPoints to user-based totals in your AppPoint budget.",
        masRef: "IBM MAS 9.1 Licensing – Install AppPoints"
      },
      {
        key: "lp_inactive_users",
        label: "Inactive and legacy user accounts reviewed",
        description: "Authorised users consume AppPoints continuously (reserved). Migrating inactive users to MAS will unnecessarily inflate the AppPoint pool requirement.",
        severity: "medium",
        autoCheck: "sql",
        sqlHint: "SELECT PERSONID, LOGINID, LASTACCESSDATE FROM MAXUSER WHERE STATUS='ACTIVE' ORDER BY LASTACCESSDATE ASC",
        remediation: "Identify users inactive for 90+ days. Deactivate or archive before migration. Review with business stakeholders.",
        masRef: "MASReady – Licence Usage Planning"
      },
      {
        key: "lp_concurrent_vs_authorized",
        label: "Concurrent vs Authorised user model decision documented",
        description: "Concurrent AppPoints provide flexibility but cost more per unit. Authorised (reserved) AppPoints cost less per unit but are dedicated. The optimal split depends on usage patterns.",
        severity: "medium",
        remediation: "Use peak concurrent usage report to determine the optimal Concurrent vs Authorised split. Document the business decision.",
        masRef: "IBM MAS 9.1 Licensing – Concurrent vs Authorised"
      },
      {
        key: "lp_openshift_vpc",
        label: "Red Hat OpenShift VPC entitlement requirement calculated",
        description: "MAS AppPoints include OpenShift entitlement: first AppPoint covers 166 VPC; each additional provides 1/8 VPC. Infrastructure nodes must also be accounted for.",
        severity: "high",
        remediation: "Calculate total VPC requirement based on OpenShift cluster sizing. Verify AppPoint entitlement covers required VPCs.",
        masRef: "IBM MAS 9.1 Licensing – Red Hat Entitlements"
      },
      {
        key: "lp_nonprod_exemptions",
        label: "Non-production install exemptions documented",
        description: "Dev/test environment installs of the same component don't consume AppPoints if at least one production install exists.",
        severity: "low",
        remediation: "Document all non-production MAS instances. Confirm they qualify for the dev/test exemption under IPLA terms.",
        masRef: "IBM MAS 9.1 Licensing – Non-Production"
      },
    ]
  },
  {
    key: "openshift_infra",
    title: "OpenShift & Infrastructure Readiness",
    description: "Validate the target OpenShift cluster design, storage, and network configuration for MAS 9 deployment.",
    items: [
      {
        key: "oc_cluster_design",
        label: "OpenShift cluster architecture documented (nodes, storage classes, ingress)",
        description: "Control-plane, worker node counts, storage class selection, and ingress/route configuration must be documented before MAS deployment begins.",
        severity: "critical",
        remediation: "Use IBM MAS sizing calculator as baseline. Document node count, storage class, ingress controller, and certificate strategy.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – OpenShift Architecture"
      },
      {
        key: "oc_ha",
        label: "High availability and disaster recovery configured for production",
        description: "Single Node OpenShift (SNO) is only appropriate for lab/demo. Production requires HA control plane and worker redundancy.",
        severity: "critical",
        remediation: "Deploy minimum 3 control-plane nodes and 3 worker nodes for production HA. Configure etcd backups and DR procedures.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Production Architecture"
      },
      {
        key: "oc_mongodb",
        label: "MongoDB or DocumentDB deployment planned and sized",
        description: "MAS Core requires MongoDB (or Amazon DocumentDB). This must be deployed and accessible before MAS Core installation.",
        severity: "critical",
        remediation: "Deploy MongoDB 5+ on OpenShift or provision DocumentDB. Configure TLS, authentication, and backup.",
        masRef: "IBM Docs: MAS Prerequisites – MongoDB"
      },
      {
        key: "oc_sls",
        label: "Suite License Service (SLS) deployment planned",
        description: "The Suite License Service manages AppPoint entitlement and must be deployed before MAS Core activation.",
        severity: "critical",
        remediation: "Install SLS operator. Configure the license file from IBM Passport Advantage. Validate connectivity to MAS Core.",
        masRef: "IBM Docs: MAS Installation – Suite License Service"
      },
      {
        key: "oc_storage",
        label: "ReadWriteMany (RWX) persistent storage validated",
        description: "MAS requires RWX persistent storage for some components. NFS, OpenShift Data Foundation, or equivalent must be available.",
        severity: "high",
        remediation: "Confirm RWX storage class availability. Size PVCs based on expected data volume. Test PVC creation and binding before deployment.",
        masRef: "IBM Docs: MAS Storage Requirements"
      },
      {
        key: "oc_certificates",
        label: "Wildcard or SAN certificates prepared for MAS routes",
        description: "MAS creates multiple OpenShift routes. Wildcard certificates or SAN certificates covering all expected hostnames must be ready.",
        severity: "high",
        remediation: "Prepare wildcard certificate for MAS domain. Configure cert-manager or manual certificate injection.",
        masRef: "IBM Docs: MAS TLS Configuration"
      },
      {
        key: "oc_sizing",
        label: "Workload sizing validated using IBM MAS sizing calculator",
        description: "Cluster sizing must account for users, integrations, cron load, reports, Mobile usage, document storage, logs, and growth headroom.",
        severity: "high",
        remediation: "Run IBM MAS sizing calculator with actual workload numbers. Add 30% growth headroom. Validate against available infrastructure.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Sizing"
      },
    ]
  },
  {
    key: "integration_readiness",
    title: "Integration & API Readiness",
    description: "Inventory all external system integrations and validate compatibility with MAS Manage API key and Kafka-based integration model.",
    items: [
      {
        key: "int_external_systems",
        label: "All external system connections inventoried",
        description: "Every system that exchanges data with Maximo must be documented: ERP, SCADA, GIS, HR, IoT platforms, and custom applications.",
        severity: "critical",
        autoCheck: "sql",
        sqlHint: "SELECT EXTSYSNAME, DESCRIPTION, ENABLED, ENDPOINTNAME FROM MAXEXTSYSTEM WHERE ENABLED=1",
        remediation: "Export external system list from Integration Framework. Document authentication method, data direction, and frequency for each.",
        masRef: "MASReady – Integration Fingerprint"
      },
      {
        key: "int_api_key_migration",
        label: "API key migration plan prepared for web-based integrations",
        description: "MAS replaces password-based API access with API keys for web-based integrations. All integration authentication must be updated.",
        severity: "critical",
        remediation: "List all integration authentication methods. Plan API key issuance and rotation process for each integration in MAS.",
        masRef: "Interloc: MAS Upgrade Readiness – Integration Authentication"
      },
      {
        key: "int_kafka",
        label: "Kafka queue replacement scoped for JMS consumers",
        description: "Any application consuming Maximo JMS queues must be rearchitected for Apache Kafka. This is often the longest integration lead-time item.",
        severity: "high",
        remediation: "Identify all JMS consumers. Engage integration architects to design Kafka consumer equivalents. Estimate development effort.",
        masRef: "MACS: MAS Migration – Kafka Integration"
      },
      {
        key: "int_connector_apppoints",
        label: "SAP/Oracle/Workday connector AppPoints assessed (80 pts each)",
        description: "IBM Maximo Connectors for SAP, Oracle, and Workday each consume 80 Install AppPoints regardless of user count.",
        severity: "high",
        remediation: "Confirm which connectors are required. Add 80 AppPoints per connector to the license planning budget.",
        masRef: "IBM MAS 9.1 Licensing – Install AppPoints"
      },
      {
        key: "int_appconnect",
        label: "IBM App Connect Enterprise VPC entitlement reviewed",
        description: "MAS includes restricted-use App Connect Enterprise entitlement: 3 VPC for Manage/Health/Predict integrations, 4 VPC for Workday connector.",
        severity: "medium",
        remediation: "Assess integration complexity. If more than 3 VPC is required, additional App Connect licenses must be procured.",
        masRef: "IBM MAS 9.1 Licensing – App Connect"
      },
      {
        key: "int_doclinks_object_storage",
        label: "Doclinks object storage migration to IBM Document Management planned",
        description: "Filesystem document links are incompatible with containerised MAS. All documents must be migrated to object storage (S3-compatible).",
        severity: "high",
        remediation: "Audit document storage size and path patterns. Plan migration to IBM Document Management Object Store before activation.",
        masRef: "MAS 9 Upgrade – Doclinks Migration"
      },
    ]
  },
  {
    key: "post_migration",
    title: "Post-Migration Validation Readiness",
    description: "Ensure a complete validation test plan exists covering business processes, technical health, and stakeholder sign-off.",
    items: [
      {
        key: "pm_test_plan",
        label: "Post-upgrade validation test plan documented",
        description: "A successful upgrade is not finished when pods are running. A structured test plan covering all critical business processes must exist.",
        severity: "critical",
        remediation: "Create test plan covering: OpenShift pod health, MAS Core, Manage UI, crons, reports, integrations, Doclinks, Mobile, and performance.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Validation"
      },
      {
        key: "pm_uat_environment",
        label: "UAT/sandbox environment provisioned for business validation",
        description: "End users require a sandbox environment for UAT before production cutover. This should mirror the production upgrade pathway.",
        severity: "high",
        remediation: "Provision UAT environment from cloned database. Assign test scenarios to business SMEs across all affected modules.",
        masRef: "MASReady – Post-Migration Validation"
      },
      {
        key: "pm_business_test_scripts",
        label: "Core business function test scripts prepared",
        description: "Core Maximo business processes must be scripted and validated: Assets, Locations, Work Orders, Inventory, Purchasing, and Contracts.",
        severity: "high",
        remediation: "Create test scripts for each core module. Assign business owners. Define pass/fail criteria.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Business Validation"
      },
      {
        key: "pm_mobile_tested",
        label: "Maximo Mobile login, sync, and inspection workflows tested",
        description: "Mobile application behaviour changes significantly in MAS. Login flows, data sync, inspection forms, and work execution must be re-validated.",
        severity: "high",
        remediation: "Test Maximo Mobile login via MAS identity provider. Validate sync intervals, offline capability, and inspection form rendering.",
        masRef: "IBM Community: MAS 9 Upgrade Checklist – Mobile"
      },
      {
        key: "pm_performance_baseline",
        label: "Performance baseline established for comparison post-migration",
        description: "Without a pre-migration performance baseline, it is impossible to attribute post-migration performance issues to the upgrade.",
        severity: "medium",
        remediation: "Capture page load times, query execution times, and cron duration baselines in 7.6 production before migration.",
        masRef: "MASReady – Delivery Intelligence – Performance Baseline"
      },
      {
        key: "pm_rollback_plan",
        label: "Rollback procedure documented and tested",
        description: "A tested rollback procedure is required in case post-activation issues cannot be resolved within the change window.",
        severity: "critical",
        remediation: "Document rollback steps: database restore procedure, application rollback, DNS cutback. Test the restore in non-production.",
        masRef: "MASReady – Upgrade Governance"
      },
      {
        key: "pm_stakeholders",
        label: "All stakeholders identified and briefed (RACI documented)",
        description: "Executive sponsor, asset management lead, IT platform owner, integration architect, security reviewer, test manager, and change manager must all be engaged.",
        severity: "high",
        remediation: "Document RACI matrix for MAS upgrade project. Confirm stakeholder sign-off gates at each phase.",
        masRef: "Interloc: MAS Upgrade Readiness – Stakeholders"
      },
    ]
  }
];

export const TOTAL_CHECKS = AUDIT_SECTIONS.reduce((a, s) => a + s.items.length, 0);

export type CheckState = Record<string, { status: CheckStatus; notes: string }>;

export function getCheckKey(sectionKey: string, itemKey: string) {
  return `${sectionKey}::${itemKey}`;
}

export function getSectionScore(section: CheckSection, state: CheckState) {
  let pass = 0, fail = 0, warn = 0, na = 0, pending = 0;
  for (const item of section.items) {
    const s = state[getCheckKey(section.key, item.key)]?.status ?? "pending";
    if (s === "pass") pass++;
    else if (s === "fail") fail++;
    else if (s === "warn") warn++;
    else if (s === "na") na++;
    else pending++;
  }
  const total = section.items.length;
  const pct = total > 0 ? Math.round(((pass + na * 0.5) / total) * 100) : 0;
  return { pass, fail, warn, na, pending, total, pct };
}

export function getOverallScore(state: CheckState) {
  let pass = 0, fail = 0, warn = 0, na = 0, pending = 0;
  for (const section of AUDIT_SECTIONS) {
    const s = getSectionScore(section, state);
    pass += s.pass; fail += s.fail; warn += s.warn; na += s.na; pending += s.pending;
  }
  const total = TOTAL_CHECKS;
  const score = total > 0 ? Math.round(((pass + na * 0.5) / total) * 100) : 0;
  return { pass, fail, warn, na, pending, total, score };
}

export function exportMarkdown(
  auditName: string,
  customerName: string,
  maximoVersion: string,
  state: CheckState
): string {
  const score = getOverallScore(state);
  const now = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

  let md = `# MASReady Environment Audit Report\n\n`;
  md += `**Audit:** ${auditName || "Environment Audit"}\n`;
  md += `**Customer:** ${customerName || "–"}\n`;
  md += `**Maximo Version:** ${maximoVersion || "–"}\n`;
  md += `**Date:** ${now}\n`;
  md += `**Overall Score:** ${score.score}% (${score.pass} pass · ${score.fail} fail · ${score.warn} warn · ${score.na} N/A · ${score.pending} pending)\n\n`;
  md += `---\n\n`;
  md += `> Review-only assessment. No Maximo mutations performed. SQL hints are for manual execution only.\n> Licence planning data is for planning visibility only and does not constitute IBM-certified compliance advice.\n\n`;

  for (const section of AUDIT_SECTIONS) {
    const sp = getSectionScore(section, state);
    md += `## ${section.title}\n\n`;
    md += `${section.description}\n\n`;
    md += `**Section:** ${sp.pass} pass · ${sp.fail} fail · ${sp.warn} warn · ${sp.na} N/A · ${sp.pending} pending\n\n`;

    for (const item of section.items) {
      const key = getCheckKey(section.key, item.key);
      const cs = state[key];
      const status = cs?.status ?? "pending";
      const emoji = status === "pass" ? "✅" : status === "fail" ? "❌" : status === "warn" ? "⚠️" : status === "na" ? "➖" : "⏳";
      md += `### ${emoji} ${item.label}\n\n`;
      md += `**Severity:** ${item.severity} | **Status:** ${status.toUpperCase()}\n\n`;
      md += `${item.description}\n\n`;
      if (item.sqlHint) md += `**SQL Hint:**\n\`\`\`sql\n${item.sqlHint}\n\`\`\`\n\n`;
      if (item.remediation) md += `**Remediation:** ${item.remediation}\n\n`;
      if (cs?.notes) md += `**Assessor Notes:** ${cs.notes}\n\n`;
      if (item.masRef) md += `**Reference:** ${item.masRef}\n\n`;
    }
  }
  return md;
}
